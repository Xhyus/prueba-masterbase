const User = require('./model')
const bcrypt = require('bcrypt')
const logger = require('../utils/errorLogger')
const { generateToken } = require('../services/token')

const createUser = async (req, res) => {
    const { email, role, name, lastname } = req.body
    let password = await bcrypt.hash(req.body.password, 10)
    try {
        const newUser = new User({ email, role, name, lastname, password })
        await newUser.save()
            .then((user) => {
                return res.status(201).send(user)
            })
    } catch (error) {
        logger.error("No se ha podido crear el usuario")
        return res.status(400).json({ message: 'No se ha podido crear el usuario' })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(404).json({ message: "No se han encontrado usuarios" })
        }
        return res.status(200).send(users)
    } catch (error) {
        logger.error("Error al buscar usuarios")
        return res.status(500).json({ message: "Error al buscar usuarios" })
    }
}

const getUser = async (req, res) => {
    const { user_id } = req.params
    try {
        const user = await User.findById(user_id)
        if (!user) {
            return res.status(404).json({ message: "No se han encontrado usuarios con ese id" })
        }
        return res.status(200).send(user)
    } catch (error) {
        logger.error("Error al obtener el usuario")
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    logger.info("Se ha realizado la peticion de login", { email, password })
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "No se ha encontrado ningun usuario con ese correo" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "La contraseña no es valida" })
        }
        return res.status(200).json({
            user,
            access_token: generateToken(user)
        })
    } catch (error) {
        console.log(error)
        logger.error("Se ha generado un error al realizar el inicio de sesion")
        return res.status(400)
    }
}

const deleteUser = async (req, res) => {
    const { user_id } = req.params
    logger.info("Se ha realizado la peticion delete user")
    try {
        const user = await User.findByIdAndDelete(user_id)
        if (!user) {
            logger.info("Se ha buscado un usuario pero no existe")
            return res.status(404).json({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).json({ message: "Se ha eliminado el usuario" })
    } catch (error) {
        logger.error("Error al realiza la eliminacion del usuario")
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    login,
    deleteUser
}