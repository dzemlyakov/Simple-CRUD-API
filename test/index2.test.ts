import { describe, expect, it } from "vitest";
import request from "supertest";
import { server } from "../src/server";
import { REQUIRED_FIELDS } from "../src/errors/errors";

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

const testUserWithWrongFileds = {
  name: 123,
  age: "25",
  hobbies: "reading",
};

describe("Test scenario 2", () => {
  // 1. Add new user into DB with incorrect fields – Expected: new user is not created, message with error
  // 2. Add new user into DB with correct fields – Expected: new user is created, code 201
  // 3. Update info (PUT) about recently created user with incorrect fields – Expected: must not updated, message with error
  // 4. Update info (PUT) about recently created user with correct fields – Expected: must  updated, code 200
  // 5. Update info (PATCH) about recently created user with incorrect fields – Expected: must not updated, message with error
  // 6. Update info (PATCH) about recently created user with correct fields – Expected: must updated, code 200

  let userId: string;

  it("Create new user with wrong fields", async () => {
    const response = await request(server)
      .post("/api/users/")
      .set("Accept", "application/json")
      .send(JSON.stringify(testUserWithWrongFileds));

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(REQUIRED_FIELDS);
  });

  it("Create new user in correctly way", async () => {
    const response = await request(server)
      .post("/api/users/")
      .set("Accept", "application/json")
      .send(JSON.stringify(testUser));

    userId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(testUser);
  });

  it("Update created user with wrong fields", async () => {
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .set("Accept", "application/json")
      .send(JSON.stringify(testUserWithWrongFileds));

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(REQUIRED_FIELDS);
  });

  it("Update created user in correctly way", async () => {
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .set("Accept", "application/json")
      .send(JSON.stringify(testUser2));

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(testUser2);
  });

  it("Update user field with wrong info", async () => {
    const response = await request(server)
      .patch(`/api/users/${userId}`)
      .set("Accept", "application/json")
      .send(JSON.stringify({ name: testUserWithWrongFileds.name }));

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(REQUIRED_FIELDS);
  });

  it("Update user field in correctly way", async () => {
    const response = await request(server)
      .patch(`/api/users/${userId}`)
      .set("Accept", "application/json")
      .send(JSON.stringify({ name: testUser.name }));

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual(testUser.name);
  });
});
