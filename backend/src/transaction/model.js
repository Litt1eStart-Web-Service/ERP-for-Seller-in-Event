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
  total_profit: {
    type: Number,
    default: 0
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


schema.pre("save", async function(next){
  if(!this.isNew){
    next()
  }
  this.total_profit = this.total_sales - this.total_margin
  next() 
})

const Transaction = mongoose.model("Transaction", schema);

module.exports = Transaction;
