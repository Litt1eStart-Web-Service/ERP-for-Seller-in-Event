const Product = require("./model");

const getAll = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  try {
    const products = await Product.find({user_id: user.id})
    if(!products) throw new Error('There is no product in this account')
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

const getFilterdData = async (req, res) => {};

const getById = async (req, res) => {
    const user = req.user;
    const {id} = req.params
    if(!user) return res.status(401).json({error: 'Unauthorized'})

    try {
        const product = await Product.findById(id)
        if(!product) throw new Error('This product is not Existed')
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const create = async (req, res) => {
  const user = req.user;
  const { name, margin, price, amount } = req.body;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  try {
    const product = await Product.create({
      user_id: user.id,
      name,
      margin,
      price,
      amount,
    });
    if (!product) throw new Error("Failed to Create new Product");
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

const deleteById = async (req, res) => {
    const user = req.user;
    const {id} = req.params
    if(!user) return res.status(401).json({error: 'Unauthorized'})

    try {
        const product = await Product.findByIdAndDelete(id)
        if(!product) throw new Error('This product is not Existed')
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const editAmount = async (req, res) => {
    const user = req.user;
    const {id} = req.params
    const { operation, newAmount } = req.body
    if(!user) return res.status(401).json({error: 'Unauthorized'})
    
    try {
        const product = await Product.findById(id)
        if(!product) throw new Error('This product is not Existed')
        switch(operation){
            case "Increase":
                product.amount += newAmount
                break;
            case "Decrease":
                if(product.amount - newAmount < 0)
                    throw new Error('Cant Update Amount | Product Amount is not enough')
                product.amount -= newAmount
                break
        }
        await product.save()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const editInfo = async (req, res) => {
    const user = req.user;
    const {id} = req.params
    const { name, margin, price, amount } = req.body
    if(!user) return res.status(401).json({error: 'Unauthorized'})

    try {
        const product = await Product.findById(id)
        if(!product) throw new Error('This product is not Existed')
        product.name = name
        product.margin = margin
        product.price = price
        product.amount = amount
        await product.save()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

module.exports = {
  getAll,
  getFilterdData,
  getById,
  create,
  deleteById,
  editAmount,
  editInfo,
};
