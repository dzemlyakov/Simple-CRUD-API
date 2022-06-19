import { describe, expect, it } from "vitest";
import request from "supertest";
import { server } from "../src/server";
import { INVALID_USER, NOT_FOUND, WRONG_URL } from "../src/errors/errors";

const testUser = {
  name: "TestName",
  age: 12,
  hobbies: ["testhobby1", "testhobby2"],
};

const testUser2 = {
    name: "TestName2",
    age: 4000,
    hobbies: [],
  };

const validId = "d5856456-525b-4079-b648-5f979ebc1b38"


describe("Test scenario 3", () => {
  
  // 1. Add new user into DB – Expected: new user is created, code 201
  // 2. Add one more user into DB and get all users – Expected: an array with two records
  // 3. Get to non-existing endpoints  – Expected: 404, human-friendly message
  // 4. Get user to non-existing Id not uuid  – Expected: 400, message: invalid user
  // 5. Get user to non-existing valid Id  – Expected: 404, message: not found

  let userId: string;

  it("Create new user", async () => {
    const response = await request(server)
      .post("/api/users/")
      .set("Accept", "application/json")
      .send(JSON.stringify(testUser));

    userId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(testUser);
  });

  it("Create one more user", async () => {
    const response = await request(server)
      .post("/api/users/")
      .set("Accept", "application/json")
      .send(JSON.stringify(testUser2));

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(testUser2);
  });
  
  it("Get all users", async () => {
    const response = await request(server).get("/api/users/");

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it("Get to non-existing endpoints", async () => {
    const response = await request(server).get("/api/admins/");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual(WRONG_URL);
  });

  it("Get user by not uuid Id", async () => {
    const response = await request(server).get(`/api/users/adminffff`);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(INVALID_USER);
  });
  
  it("Get user by valid non-existing uuid Id", async () => {
    const response = await request(server).get(`/api/users/${validId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(NOT_FOUND);
  });
});
