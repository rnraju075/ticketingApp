import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

jest.setTimeout(30000);

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "testjwt";

  mongo = await MongoMemoryServer.create();

  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();

  if (mongo) {
    await mongo.stop();
  }
});

global.signin = async () => {
  const email = "test@gmail.com";
  const password = "password";

  // first signup user
  const response = await request(app)
    .post("/api/auth/signin")
    .send({
      email,
      password,
    })
    .expect(200);

  const cookie = response.get("Set-Cookie");

  if (!cookie) {
    throw new Error("Cookie not found");
  }

  return cookie;
};

export {};