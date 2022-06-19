import { describe, expect, it } from "vitest";
import request from "supertest";
import { server } from "../src/server";

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

describe("Test scenario 1", () => {
  
  // 1. Get all records about users - Expected: an empty array
  // 2. Add new user into DB – Expected: newly created record
  // 3. Get recently created user from DB by id – Expected: created record
  // 4. Update info about recently created user – Expected: updated record
  // 5. Delete recently created user – Expected: code 204
  // 6. Get recently removed user – Expected: code 404, not found
 
  let userId: string;
  
  it("Get all users", async () => {
    const response = await request(server).get("/api/users/");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it("Create new user", async () => {
    const response = await request(server)
      .post("/api/users/")
      .set("Accept", "application/json")
      .send(JSON.stringify(testUser));

    userId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(testUser);
  });

  it("Get created user by Id", async () => {
    const response = await request(server).get(`/api/users/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(testUser);
  });

  it("Update created user", async () => {
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .set("Accept", "application/json")
      .send(JSON.stringify(testUser2));

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(testUser2);
  });

  it("Delete user", async () => {
    const response = await request(server).delete(`/api/users/${userId}`);

    expect(response.statusCode).toBe(204);
  });

  it("Get deleted user", async () => {
    const response = await request(server).get(`/api/users/${userId}`);

    expect(response.statusCode).toBe(404);
  });
});
