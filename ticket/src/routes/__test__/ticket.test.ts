import request from "supertest";
import { app } from "../../app";

describe("ticket", () => {
  it("has a route handler listening to /api/auth/signin for post requests", async () => {
    const response = await request(app).post("/api/ticket").send({});
    expect(response.status).not.toEqual(404);
  });
  it("can only be accessed if user is signed in", async () => {
    await request(app).post("/api/ticket").send({}).expect(401);
  });
  it("debug global", () => {
    console.log("global.signin =", global.signin);
  });
  it("returns a status other than 401 if the user is signed in", async () => {
    console.log("signin cookie", global.signin);
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({});
    expect(response.status).not.toEqual(401);
  });
  it("returns a 400 with an invalid title", async () => {
    await request(app)
      .post("/api/ticket")
      .set("Cookie", global.signin())
      .send({
        title: "",
        price: 10,
      })
      .expect(400);
    await request(app)
      .post("/api/ticket")
      .set("Cookie", global.signin())
      .send({
        price: 10,
      })
      .expect(400);
  });
  it("returns a 400 with an invalid price", async () => {
    await request(app)
        .post("/api/ticket")
        .set("Cookie", global.signin())
        .send({
          title: "thebook",
          price: -10
        })
        .expect(400);

    await request(app)
        .post("/api/ticket")
        .set("Cookie", global.signin())
        .send({
          title: "the book",
        })
        .expect(400);
  });
  it("creates a ticket with valid inputs", async () => {
      await request(app)
          .post("/api/ticket")
          .set("Cookie", global.signin())
          .send({
            title: "the book",
            price: 20
          })
          .expect(201);
  });
});
