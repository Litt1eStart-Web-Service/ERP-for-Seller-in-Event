const express = require("express");
const {
  getAll,
  getById,
  create,
  editStatus,
  deleteById,
} = require("./controller");

const verifyToken = require('../middleware/verifyToken')
const userValidation = require('../middleware/userValidation')

const router = express.Router();

router.get("/getAll", verifyToken, userValidation, getAll);
router.get("/:id", verifyToken, userValidation, getById);
router.post("create", verifyToken, userValidation, create);
router.put("/edit/status", verifyToken, userValidation, editStatus);
router.delete("/:id", verifyToken, userValidation, deleteById);

module.exports = router;
