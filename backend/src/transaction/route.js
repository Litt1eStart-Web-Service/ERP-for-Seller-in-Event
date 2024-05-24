const express = require("express");
const { getAll, getFilterdData, getById, create, getFilteredDataByMonthYear, getFilteredDataByMonth } = require("./controller");

const verifyToken = require('../middleware/verifyToken')
const userValidation = require('../middleware/userValidation')

const router = express.Router();

router.get("/getAll", verifyToken, userValidation, getAll);
router.get("/filteredData/:dataType", verifyToken, userValidation, getFilterdData);
router.get("/filteredData/byYear/:year", verifyToken, userValidation, getFilteredDataByMonthYear);
router.get("/filteredData/byMonth/:year/:month", verifyToken, userValidation, getFilteredDataByMonth);
router.get("/:id", verifyToken, userValidation, getById);
router.post("/create", verifyToken, userValidation, create);

module.exports = router;
