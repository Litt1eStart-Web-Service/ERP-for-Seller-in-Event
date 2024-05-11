const getAll = async(req, res) => {
    const user = req.user
    if(!user)
        return res.status(401).json({error: 'Unauthorized'})

    res.status(200).json(user)
}

const getFilterdData = async(req, res) => {

}

const getById = async(req, res) => {

}

const create = async(req, res) => {

}

const deleteById = async(req, res) => {

}

const editAmount = async(req, res) => {

}

const editInfo = async(req, res) => {
    
}

module.exports = { getAll, getFilterdData, getById, create, deleteById, editAmount, editInfo }