# CRUD API

## Description

This is simple CRUD API using in-memory database underneath. It's implemented on vanila Node.JS using Typescript, nodemon, and vitest with supertest for unit-tests

## How to run
Clone this repository with comand:
`git clone`

To run this app open the terminal (your curent work directory should be: ***Users/../Simple-CRUD-API/*** )
 

```bash
npm run start:prod 
``` 
this command starting build and run the server (on the localhost:3000 by default)
```bash
npm run start:dev 
``` 
this command starting app with hot reload using nodemon. The server will run on the localhost:3000 by default.
```bash
npm run start:multi 
``` 
this script starts multiple instances of app using Cluster API
```bash
npm run test 
``` 
this command runs unit-tests 
 
### Implementation details

 **Implemented endpoint `api/users`:**
  - **GET** `api/users` is used to get all persons
    - Server answer with `status code` **200** and all users records
  - **GET** `api/users/${userId}` 
    - Server answer with `status code` **200** and record with `id === userId` if it exists
    - Server  answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - **POST** `api/users` is used to create record about new user and store it in database
    - Server answer with `status code` **201** and newly created record
    - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - **PUT** `api/users/{userId}` is used to update existing user
    - Server answer with` status code` **200** and updated record
    - Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - **DELETE** `api/users/${userId}` is used to delete existing user from database
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
 
### Users are stored as `objects` that have following properties:
 - `id` — unique identifier (`string`, `uuid`) 
 - `username` — user's name (`string`, **required**)
 - `age` — user's age (`number`, **required**)
 - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
