//Refactoring Code for Error

const Product = require("./model");

const getAll = async (req, res, next) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  try {
    const products = await Product.find({user_id: user.id})
    if(!products) throw new Error('There is no product in this account')
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
};

const getById = async (req, res, next) => {
    const user = req.user;
    const {id} = req.params
    if(!user) return res.status(401).json({error: 'Unauthorized'})

    try {
        const product = await Product.findById(id)
        if(!product) throw new Error('This product is not Existed')
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
};

const create = async (req, res, next) => {
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
    next(error)
  }
};

const deleteById = async (req, res, next) => {
    const user = req.user;
    const {id} = req.params
    if(!user) return res.status(401).json({error: 'Unauthorized'})

    try {
        const product = await Product.findByIdAndDelete(id)
        if(!product) throw new Error('This product is not Existed')
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
};

const editAmount = async (req, res, next) => {
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
        next(error)
    }
};

const editInfo = async (req, res, next) => {
    const user = req.user;
    const {id} = req.params
    const { name, margin, price, amount } = req.body
    
    if(!id)
      return res.status(404).json({error: 'Id not Found'})

    if(!name || !margin || !price || !amount)
      return res.status(404).json({error: 'Credential not found'})

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
        next(error)
    }
};

//Filterd Data
const getFilterdData = async (req, res, next) => {
  const user = req.user
  const { dataType } = req.params
  if(!dataType)
    return res.status(404).json({error: 'Resource Not Found'})
  try {
    const products = await filterdDataByFieldName(dataType, user)
    if(!products || products.length === 0) throw new Error('Product Resource not found')
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
};

const filterdDataByFieldName = async(fieldName, user) => {
  let sortOptions = {}
  sortOptions[fieldName] = 1
  const products = await Product.find({ user_id: user.id }, fieldName).sort(sortOptions)
  return products
}
//Filterd Data

module.exports = {
  getAll,
  getFilterdData,
  getById,
  create,
  deleteById,
  editAmount,
  editInfo,
};
