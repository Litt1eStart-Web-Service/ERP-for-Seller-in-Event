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

router.post("/create", verifyToken, userValidation, create);
router.get("/getAll", verifyToken, userValidation, getAll);
router.get("/:id", verifyToken, userValidation, getById);
router.put("/edit/status/:id", verifyToken, userValidation, editStatus);
router.delete("/:id", verifyToken, userValidation, deleteById);

module.exports = router;
