import request from "supertest";
import server from "../main";
import { getConnection } from "typeorm";
import { db } from "db";
import { User } from "entities/user";
import { TUser } from "validators/user";
import { identity } from "io-ts";

beforeAll(async () => {
  await db;
});

afterAll(async () => {
  server.close();
  await getConnection().dropDatabase();
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
    // given
    const user = new User();
    user.firstName = "tycho";
    user.lastName = "tatitscheff";
    user.birthDate = new Date("1992-09-16T00:00:00.000Z");
    user.registrationDate = new Date("2019-02-23T16:09:08.128Z");
    const repository = getConnection().getRepository(User);
    await repository.save(user);

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
        birthDate: "1992-09-16",
        registrationDate: "2019-02-23"
      }
    ];
    expect(response.status).toEqual(200);
    const bodyWithoutId = response.body.map((u: User) => {
      const { id, ...rest } = u;
      return rest;
    });
    expect(bodyWithoutId).toEqual(expected);
  });
});
