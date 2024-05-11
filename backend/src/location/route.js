const express = require("express");
const {
  create,
  getAll,
  getFilteredData,
  editData,
  deleteById,
} = require("./controller");

const router = express.Router();

router.post("/create", create);
router.get("/getAll", getAll);
router.get("/filteredData", getFilteredData);
router.put("/:id", editData);
router.delete("/:id", deleteById);
module.exports = router;
