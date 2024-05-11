const express = require("express");
const { getAll, getFilterdData, getById, create } = require("./controller");

const router = express.Router();

router.get("/getAll", getAll);
router.get("/filterdData", getFilterdData);
router.get("/:id", getById);
router.post("/create", create);

module.exports = router;
