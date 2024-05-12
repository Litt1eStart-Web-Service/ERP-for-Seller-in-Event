const Transaction = require("./model");
const Order = require('../order/model')

const getAll = async (req, res, next) => {
  const user = req.user;
  try {
    const transactions = await Transaction.find({ user_id: user.id })
      .populate("location")
      .exec();
    if (!transactions || transactions.length === 0)
      throw new Error("Resource not Found");
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

const getFilterdData = async (req, res, next) => {
  const user = req.user;
  const { dataType } = req.params;
  if (!dataType)
    return res.status(404).json({ error: "Credential not complete" });

  try {
    const transactions = await filterdDataByFieldName(dataType, user);
    if (!transactions || transactions.length === 0)
      throw new Error("Resource not Found");
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};
const filterdDataByFieldName = async (dataType, user) => {
  const sortOption = {};
  sortOption[dataType] = 1;
  const transactions = await Transaction.find({ user_id: user.id })
    .sort(sortOption)
    .populate("location")
    .exec();
  return transactions;
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ error: "Credential Not Complete" });

  try {
    const transaction = await Transaction.findById(id)
      .populate("location")
      .exec();
    if (!transaction) throw new Error(`Resource not Found`);
    res.status(200).json(transaction);
  } catch (error) {
    next();
  }
};

const create = async (req, res, next) => {
  const user = req.user;
  const {
    orders,
    total_sales,
    location,
    employee_wage,
    other_expenses,
    date,
  } = req.body;
  try {

    let total_margin = 0;
    orders.map((order)=>{
      const orderValue = order.amount * order.product_id.margin
      total_margin += orderValue
    })

    const transaction = await Transaction.create({
      user_id: user.id,
      total_margin,
      total_sales,
      location,
      employee_wage,
      other_expenses,
      date,
    });
    if (!transaction) throw new Error("Failed to create new Tranasction");
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getFilterdData, getById, create };
