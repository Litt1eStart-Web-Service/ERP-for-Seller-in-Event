const mongoose = require("mongoose");
const Location = require("../location/model");

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    employee_wage: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isNew || this.name || !this.location) {
    return next();
  }
  try {
    const location = await Location.findById(this.location)
    if(!location)
        throw new Error('Location not Found')

    const currentDate = new Date().toISOString().slice(0, 10);
    this.name = `${location.name} | ${currentDate}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Planner = mongoose.model("Planner", schema);

module.exports = Planner;
