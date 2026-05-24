import request from "supertest";

import { app } from "../../app";

describe("signin route", () => {
    it("fails when email does not exist ", async () => {
        await request(app)
        .post("/api/auth/signin")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(400);
    });

    it("fails when incorrect password is provided", async () => {
        await request(app)
        .post("/api/auth/signup")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);
        await request(app)
        .post("/api/auth/signin")
        .send({
            email: "test@gmail.com",
            password: "wrongpassword"
        })
        .expect(400);
    });

    it("responds with a cookie when given valid credentials", async () => {
        await request(app)
        .post("/api/auth/signup")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);
        const response = await request(app)
        .post("/api/auth/signin")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        expect(200);
        expect(response.get("Set-Cookie")).toBeDefined();
    });
});