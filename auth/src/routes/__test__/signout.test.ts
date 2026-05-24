import request from "supertest";
import {app} from "../../app";

describe("signout route", () => {
    it("clears the cookie after signing out", async () => {
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
            password: "password"
        })
        .expect(200);

        const response = await request(app)
        .post("/api/auth/signout")
        .send({})
        .expect(200);
        console.log("Signout response:", response.get("Set-Cookie"));
        const cookie = response.get("Set-Cookie");
        expect(cookie).toBeDefined();
        if (cookie) {
            expect(cookie[0]).toMatch(/session=;/);
        }
        // expect(response.get("Set-Cookie")).toBeUndefined();
    });
});