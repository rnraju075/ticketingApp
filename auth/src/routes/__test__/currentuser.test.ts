import request from "supertest";
import { app } from "../../app";

describe("currentuser route", () => {
  it("responds with details of the current user", async () => {
    // Signup
    await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@gmail.com",
        password: "password",
      })
      .expect(201);

    // Signin
    const signinResponse = await global.signin();

    console.log("Signin response:", signinResponse);
    const cookie = signinResponse[0];
     
    // Current user request
    const currentUserResponse = await request(app)
      .get("/api/auth/currentuser")
      .set("Cookie", cookie)
      .expect(200);

      console.log("Current user response:", currentUserResponse.body);
    // Assertions
    expect(currentUserResponse.body.currentUser.email).toEqual(
      "test@gmail.com"
    );
  });

  it("responds with null if not authenticated", async () => {
    const response = await request(app)
      .get("/api/auth/currentuser")
      .expect(200);

    expect(response.body.currentUser).toBeNull();
  });
});