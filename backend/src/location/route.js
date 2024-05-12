const express = require("express");
const {
  create,
  getAll,
  getFilteredData,
  editData,
  deleteById,
} = require("./controller");

const verifyToken = require('../middleware/verifyToken')
const userValidation = require('../middleware/userValidation')

const router = express.Router();

router.post("/create",  verifyToken, userValidation, create);
router.get("/getAll", verifyToken, userValidation,  getAll);
router.get("/filteredData/:dataType",  verifyToken, userValidation, getFilteredData);
router.put("/:id", verifyToken, userValidation,  editData);
router.delete("/:id", verifyToken, userValidation,  deleteById);

module.exports = router;
