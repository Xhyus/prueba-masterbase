const logger = require('../utils/errorLogger')
const { validateToken } = require('../services/token')

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    logger.info("Se ha realizado autenticacion")
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "No autorizado" })
    }
    try {
        const decoded = validateToken(token)
        req.user = decoded
        next()
    } catch (error) {
        logger.error("Se ha intentado hacer una peticion no autorizada")
        console.log(error)
        return res.status(401).json({ message: "No autorizado" })
    }
}

module.exports = auth