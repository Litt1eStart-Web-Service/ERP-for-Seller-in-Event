const Planner = require("./model");

const getAll = async (req, res, next) => {
    const user = req.user
    try {
        const planners = await Planner.find({user_id: user.id}).populate("location").exec()
        if(!planners) throw new Error('Resource not Found')
        res.status(200).json(planners)
    } catch (error) {
        next(error)
    }
};

const getById = async (req, res, next) => {
    const {id} = req.params
    if(!id) return res.status(404).json({error: "Resource not Found"})
    try {
        const planner = await Planner.findById(id)
        if(!planner) throw new Error('Resource not Found')
        res.status(200).json(planner)
    } catch (error) {
        next(error)
    }
};

const create = async (req, res, next) => {
  const user = req.user;
  const { name, location, employee_wage } = req.body;
  if (!location) throw new Error("Credential not Complete");
  try {
    let planner;
    if (name === "") {
      planner = await Planner.create({
        user_id: user.id,
        location,
        employee_wage,
      });
    } else {
      planner = await Planner.create({
        user_id: user.id,
        name,
        location,
        employee_wage,
      });
    }
    if (!planner) throw new Error("Failed to create new Planner");
    res.status(200).json(planner);
  } catch (error) {
    next(error);
  }
};

const editStatus = async (req, res) => {
    const {id} = req.params
    if(!id) return res.status(404).json({error: "Resource not Found"})
    try {
        const planner = await Planner.findById(id)
        if(!planner) throw new Error('Resource not Found')
        const updatedStatus = !planner.status
        planner.status = updatedStatus
        await planner.save()
        res.status(200).json(planner)
    } catch (error) {
        next(error)
    }
};

const deleteById = async (req, res, next) => {
    const {id} = req.params
    if(!id) return res.status(404).json({error: "Resource not Found"})
    try {
        const deleteQuery = await Planner.findByIdAndDelete(id)
        if(!deleteQuery) throw new Error('Resource not Found')
        res.status(200).json(deleteQuery)
    } catch (error) {
        next(error)
    }
};

module.exports = { getAll, getById, create, editStatus, deleteById };
