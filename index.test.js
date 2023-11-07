// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here
  it("Testing musicians endPoint", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
  });

  it("testing GET/musicians/:id returns musician by id", async () => {
    const response = await request(app).get("/musicians/1");
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toEqual("object");
  });
});

describe("./bands endpoint", () => {
  // Write your tests here
  it("Testing bands endPoint", async () => {
    const response = await request(app).get("/bands");
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
  });
});
