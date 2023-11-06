const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians
app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/musicians/1", async (req, res) => {
  const musician = await Musician.findByPk(1);
  res.json(musician);
});

app.get("/bands", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});
module.exports = app;
