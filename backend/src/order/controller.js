const Product = require("../product/model");
const Order = require("./model");

const create = async (req, res, next) => {
  const { planner_id, product_id, amount } = req.body;
  if (!planner_id || !product_id || !amount)
    return res.status(404).json({ error: "Credential not complete" });

  try {
    const existed = await Order.findOne({planner_id, product_id})
    if(existed){
      throw new Error('This product already created in this planner')
    }

    const product = await Product.findById(product_id)
    if(product.amount - amount < 0){
      throw new Error('Product is not Enough')
    }

    const order = await Order.create({ planner_id, product_id, amount });
    if (!order) throw new Error("Failed to create order");
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const { planner_id } = req.params;
  try {
    const orders = await Order.find({ planner_id })
      .populate("planner_id")
      .populate("product_id")
      .exec();
    if (!orders) throw new Error("Resource not found");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ error: "Credential not complete" });

  try {
    const deleteQuery = await Order.findByIdAndDelete(id);
    if (!deleteQuery) throw new Error("Resource not Found");
    res.status(200).json(deleteQuery);
  } catch (error) {
    next(error);
  }
};

const editOrderById = async(req, res, next) => {
  const {id} = req.params;
  const {amount} = req.body;
  if (!id) return res.status(404).json({ error: "Credential not complete" });

  try {
    const order = await Order.findById(id);
    if (!order) throw new Error("Resource not Found");
    order.amount = amount;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = { create, getAll, deleteById, editOrderById };
