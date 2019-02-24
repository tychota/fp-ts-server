import request from "supertest";
import server from "../main";
import { getConnection } from "typeorm";
import { db } from "db";
import { User } from "entities/user";

beforeAll(async () => {
  await db;
});

afterAll(async () => {
  server.close();
  await getConnection().dropDatabase();
});

describe("main routes tests", () => {
  test("get OK route - 200 - GET /OK", async () => {
    // when
    const response = await request(server).get("/OK");

    // then
    expect(response.status).toEqual(200);
    expect(response.text).toContain("OK");
  });
});

describe("users routes tests", () => {
  test("get all route - 200 - GET /users/all", async () => {
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
    expect(response.body).toBeArray();
    const bodyWithoutId = response.body.map((u: User) => {
      const { id, ...rest } = u;
      return rest;
    });
    expect(bodyWithoutId).toEqual(expected);
  });
  test("get route - 200 - GET /users/:id", async () => {
    // given
    const user = new User();
    user.firstName = "tycho";
    user.lastName = "tatitscheff";
    user.birthDate = new Date("1992-09-16T00:00:00.000Z");
    user.registrationDate = new Date("2019-02-23T16:09:08.128Z");
    const repository = getConnection().getRepository(User);
    const userDB = await repository.save(user);

    // when
    const response = await request(server)
      .get("/users/" + userDB.id)
      .query({ format: "json" })
      .set("Accept", "application/json");

    // then
    const expected = {
      firstName: "tycho",
      lastName: "tatitscheff",
      birthDate: "1992-09-16",
      registrationDate: "2019-02-23"
    };
    expect(response.status).toEqual(200);
    const { id, ...bodyWithoutId } = response.body;
    expect(bodyWithoutId).toEqual(expected);
  });
  test("get route - 404 - GET /users/:id", async () => {
    // given
    // when
    const response = await request(server)
      .get("/users/" + "9a46bcdc-2042-4d12-98e3-e4d94c73a00f")
      .query({ format: "json" })
      .set("Accept", "application/json");

    // then
    const expected = {
      data: null,
      errors: [
        {
          message: 'Could not find any entity of type "User" matching: "9a46bcdc-2042-4d12-98e3-e4d94c73a00f"',
          name: "EntityNotFound"
        }
      ]
    };
    expect(response.status).toEqual(404);
    expect(response.body).toEqual(expected);
  });
});
