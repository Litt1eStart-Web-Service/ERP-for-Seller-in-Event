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

const router = express.Router();

router.get("/getAll", verifyToken, getAll);
router.get("/filterdData", verifyToken, getFilterdData);
router.get("/:id", verifyToken, getById);
router.post("/create", verifyToken, create);
router.delete("/:id", verifyToken, deleteById);
router.put("/edit/amount/:id", verifyToken, editAmount);
router.put("/edit/info/:id", verifyToken, editInfo);

module.exports = router;
