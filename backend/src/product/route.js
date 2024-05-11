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

const router = express.Router();

router.get("/getAll", getAll);
router.get("/filterdData", getFilterdData);
router.get("/:id", getById);
router.post("/create", create);
router.delete("/:id", deleteById);
router.put("/edit/amount", editAmount);
router.put("/edit/info", editInfo);

module.exports = router;
