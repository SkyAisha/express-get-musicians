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

  it("POST should create new musician", async () => {
    const newMusician = {
      name: "John Smith",
      instrument: "Guitar",
    };
    const response = await request(app).post("/musicians").send(newMusician);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toEqual("object");
  });

  it("Should return error if name field is empty", async () => {
    const musician = {
      name: "",
      instrument: "Piano",
    };
    const response = await request(app).post("/musicians").send(musician);
    expect(Array.isArray(response.body.error)).toBe(true);
  });

  it("Should return error if instrument field is empty", async () => {
    const musician = {
      name: "Jessica Walsh",
      instrument: "",
    };
    const response = await request(app).post("/musicians").send(musician);
    expect(Array.isArray(response.body.error)).toBe(true);
  });
  it("Should return error if all fields are empty", async () => {
    const musician = {};
    const response = await request(app).post("/musicians").send(musician);
    expect(Array.isArray(response.body.error)).toBe(true);
  });

  it("PUT should update musician", async () => {
    const updatedMusician = {
      name: "William Jones",
      instrument: "Voice",
    };
    const response = await request(app)
      .put("/musicians/1")
      .send(updatedMusician);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toEqual("object");
  });

  it("DELETE should delete existing musician", async () => {
    const response = await request(app).delete("/musicians/1");
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
