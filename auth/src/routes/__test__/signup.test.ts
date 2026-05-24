import { app } from "../../app";
import request from "supertest";

describe("signup route",() =>{

    it("return 201 on successful signup", async () => {
        await request(app)
        .post("/api/auth/signup")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);
    });

    it("return 400 with invalid email", async () => {
        await request(app)
        .post("/api/auth/signup")
        .send({
            email: "invalid-email",
            password: "password"
        })
        .expect(400);
    });

    it("return 400 with invalid password", async () => {
        await request(app)
        .post("/api/auth/signup")
        .send({
            email: "test@gmail.com",
            password: "short"
        })
        .expect(400);
    });

    it("return 400 with missing email and password", async () => {
        await request(app)
        .post("/api/auth/signup")
        .send({})
        .expect(400);
    });

    it("disallow duplicate emails", async () => {
        await request(app)
        .post("/api/auth/signup")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);

        await request(app)
        .post("/api/auth/signup")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(400);
    });

    it("sets a cookie after successful signup", async () => {
        const response = await request(app)
        .post("/api/auth/signup")
        .send({
            email: "test@gmail.com",
            password: "password"
        });
        expect(201);
        expect(response.get("Set-Cookie")).toBeDefined();
    });
});