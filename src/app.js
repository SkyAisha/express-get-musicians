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

//app.get("/musicians/1", async (req, res) => {
//const musician = await Musician.findByPk(1);
//res.json(musician);
//});

app.get("/bands", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});

app.get("/musicians/:id", async (req, res) => {
  const id = req.params.id;
  const musician = await Musician.findByPk(id);
  res.json(musician);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/musicians", async (req, res) => {
  const newMusician = await Musician.create(req.body);
  res.send("new Musician created");
});

app.put("/musicians/:id", async (req, res) => {
  const updatedMusician = await Musician.update(req.body, {
    where: { id: req.params.id },
  });
  res.send("Musician has been updated");
});

app.delete("/musicians/:id", async (req, res) => {
  await Musician.destroy({ where: { id: req.params.id } });
  res.send("Musician has been deleted");
});
module.exports = app;
