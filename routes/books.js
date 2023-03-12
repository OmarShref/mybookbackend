const express = require("express");
const router = express.Router();
const Book = require("../schemas/Book");
const joi = require("joi");

// GET
router.get("/", (req, res) => {
  Book.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(204).send());
});

// POST
router.post("/", (req, res) => {
  const body = req.body;
  const schema = joi.object({
    title: joi.string().trim().required(),
    author: joi.string().trim().required(),
    genre: joi.string().trim().required(),
    cover: joi.string().trim().uri().required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    res.status(200).send(error);
  } else {
    const newBook = {
      title: body.title,
      author: body.author,
      genre: body.genre,
      cover: body.cover,
    };
    Book.insertMany(newBook)
      .then(() => res.status(201).send())
      .catch((err) => res.status(500).send(err));
  }
});

// DELETE
router.delete("/", (req, res) => {
  const body = req.body;
  const schema = joi.object({
    id: joi.string().trim().required(),
  });
  const { error } = schema.validate(body);
  if (error) {
    res.status(204).send();
  } else {
    Book.findOneAndDelete({ _id: body.id })
      .then(() => {
        res.status(200).send();
      })
      .catch(() => res.status(204).send());
  }
});

module.exports = router;
