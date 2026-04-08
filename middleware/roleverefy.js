import { ADMIN } from '../utils/roles.js'

const Adminverify = (req, res, next) => {
    if (req.userRole !== ADMIN) {
        return res.status(403).json({
            message: "unauthorized user"
        })
    }

    next()
}

export default Adminverify
