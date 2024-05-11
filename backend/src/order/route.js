const express = require("express");
const { create, getAll, deleteById } = require("./controller");

const router = express.Router();

router.post("/create", create);
router.get("/getAll", getAll);
router.delete("/:id", deleteById);

module.exports = router;
