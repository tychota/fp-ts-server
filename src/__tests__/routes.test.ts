import request from "supertest";
import server from "../main";

afterAll(() => {
  server.close();
});

describe("main routes tests", () => {
  test("get OK route GET /OK", async () => {
    // when
    const response = await request(server).get("/OK");

    // then
    expect(response.status).toEqual(200);
    expect(response.text).toContain("OK");
  });
});

describe("users routes tests", () => {
  test("get all route GET /users/all", async () => {
    // when
    const response = await request(server)
      .get("/users/all")
      .query({ format: "json" })
      .set("Accept", "application/json");

    // then
    const expected = [
      {
        firstName: "tycho",
        lastName: "tatitscheff",
        birthDate: "1992-09-16T00:00:00.000Z",
        registrationDate: "2019-02-23T16:09:08.128Z"
      }
    ];
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected);
  });
});
