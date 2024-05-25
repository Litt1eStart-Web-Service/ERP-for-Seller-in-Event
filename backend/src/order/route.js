const express = require("express");
const { create, getAll, deleteById, editOrderById } = require("./controller");

const verifyToken = require('../middleware/verifyToken')
const userValidation = require('../middleware/userValidation')

const router = express.Router();

router.post("/create", verifyToken, userValidation, create);
router.get("/:planner_id", verifyToken, userValidation, getAll);
router.delete("/:id", verifyToken, userValidation, deleteById);
router.put("/:id", verifyToken, userValidation, editOrderById);

module.exports = router;
