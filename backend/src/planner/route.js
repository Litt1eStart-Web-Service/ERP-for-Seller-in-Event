const express = require("express");
const {
  getAll,
  getById,
  create,
  editStatus,
  deleteById,
} = require("./controller");

const router = express.Router();

router.get("/getAll", getAll);
router.get("/:id", getById);
router.post("create", create);
router.put("/edit/status", editStatus);
router.delete("/:id", deleteById);

module.exports = router;
