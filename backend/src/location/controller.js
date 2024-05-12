const Location = require('./model')

const create = async(req, res, next) => {
    const user = req.user
    const { name, price } = req.body
    if(!name || !price)
        throw new Error('Credential Not Complete')

    try {
        const location = await Location.create({ user_id: user.id, name, price })
        if(!location) throw new Error('Failed to create new Location')
        res.status(200).json(location)
    } catch (error) {
        next(error)
    }
}

const getAll = async(req, res, next) => {
    const user = req.user
    try {
        const locations = await Location.find({ user_id: user.id })
        if(!locations) throw new Error('Resource Not Found')
        res.status(200).json(locations)
    } catch (error) {
        next(error)
    }
}

const getFilteredData = async(req, res, next) => {
    const user = req.user
    const { dataType } = req.params
    try {
        let locations;
        switch(dataType){
            case "name":
                locations = await Location.find({ user_id: user.id }).sort({ name: 1 })
                break
            case "price":
                locations = await Location.find({ user_id: user.id}).sort({ price: 1})
                break
        }
        if(!locations || locations.length === 0) throw new Error('Resource not Found')
        res.status(200).json(locations)
    } catch (error) {
        next(error)
    }
}

const editData = async(req, res, next) => {
    const {id} = req.params
    const {name, price} = req.body
    if(!id) return res.status(404).json({error: 'Id not existed'})
    
    try {
        const location = await Location.findById(id)
        if(!location) throw new Error('Resource not Found')
        location.name = name
        location.price = price
        await location.save()
        res.status(200).json(location)
    } catch (error) {
        next(error)
    }
}

const deleteById = async(req, res, next) => {
    const {id} = req.params
    if(!id) return res.status(404).json({error: 'Id not existed'})
    try {
        const deleteQuery = await Location.findByIdAndDelete(id)
        if(!deleteQuery) throw new Error('Location not Found')
        res.status(200).json({message: 'Succesfully Delete Location'})
    } catch (error) {
        next(error)
    }
}

module.exports = { create, getAll, getFilteredData, editData, deleteById}