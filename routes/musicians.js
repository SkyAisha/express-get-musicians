const express = require("express");
const { Musician } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  musicians = await Musician.findAll();
  res.json(musicians);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const musician = await Musician.findByPk(id);
  res.json(musician);
});

router.delete("/:id", async (req, res) => {
  await Musician.destroy({ where: { id: req.params.id } });
  res.send("Musician has been deleted");
});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const newMusician = await Musician.create(req.body);
  res.send("new Musician created");
});

router.put("/:id", async (req, res) => {
  const updatedMusician = await Musician.update(req.body, {
    where: { id: req.params.id },
  });
  res.send("Musician has been updated");
});

module.exports = router;
