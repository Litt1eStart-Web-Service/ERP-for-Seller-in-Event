const express = require("express");
const {
  getAll,
  getFilterdData,
  getById,
  create,
  deleteById,
  editAmount,
  editInfo
} = require("./controller");

const verifyToken = require('../middleware/verifyToken')
const userValidation = require('../middleware/userValidation')

const router = express.Router();

router.get("/getAll", verifyToken, userValidation, getAll);
router.get("/filteredData/:dataType", verifyToken, userValidation, getFilterdData);
router.get("/:id", verifyToken, userValidation, getById);
router.post("/create", verifyToken, userValidation, create);
router.delete("/:id", verifyToken, userValidation, deleteById);
router.put("/edit/amount/:id", verifyToken, userValidation, editAmount);
router.put("/edit/info/:id", verifyToken, userValidation, editInfo);

module.exports = router;
