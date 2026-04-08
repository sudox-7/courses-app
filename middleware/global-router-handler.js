import {ERROR} from '../utils/httpresstatus.js'
export const GlobalRouterHandler = (req, res) => {
    res.status(404).json({
        status: ERROR,
        data: {
            message: "Route not found",
            path: req.originalUrl
        }
    })
};