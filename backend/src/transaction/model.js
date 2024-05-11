const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  total_margin: {
    type: Number,
    min: 0,
    default: 0,
  },
  total_sales: {
    type: Number,
    min: 0,
    default: 0,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  employee_wage: {
    type: Number,
    min: 0,
    default: 0,
  },
  other_expenses: {
    type: Number,
    min: 0,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

schema.virtual("total_profit").get(function () {
  if(!this.populate("location")){
    throw new Error('Location is not populated. Cant calculate total_profit');
  }
  
  return (
    this.total_sales -
    (this.total_margin +
      this.location.price +
      this.employee_wage +
      this.other_expenses)
  );
});

const Transaction = mongoose.model("Transaction", schema);

module.exports = Transaction;
