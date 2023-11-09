const express = require("express");
const { Musician } = require("../models");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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
//router.use(express.urlencoded({ extended: true }));

router.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      await Musician.create(req.body);
      const musicians = await Musician.findAll();
      res.json(musicians);
    }
  }
);

router.put("/:id", async (req, res) => {
  const updatedMusician = await Musician.update(req.body, {
    where: { id: req.params.id },
  });
  res.send("Musician has been updated");
});

module.exports = router;
