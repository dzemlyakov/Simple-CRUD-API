import { describe, test, expect, it } from "vitest";
import  request  from "supertest";
import { server  } from "../src/server";

const testUser = {
    name: "TestName",
    age: 12,
    hobbies: ["testhobby1", "testhobby2"]
}

describe('Test scenario 1', () => {
    
    it('Get all users', async () => {
        const response = await request(server).get('/api/users/')
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual([])
    })

    
})