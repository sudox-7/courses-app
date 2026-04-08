import user from '../../models/users.js';
import { SUCCESS, FAIL } from '../../utils/httpresstatus.js'
export const GetUser = async (req, res) => {
    const data = await user.find({}, { "__v": false, "password": false, "createdAt": false, "updatedAt": false })
    if (!data) {
        return res.status(404).json({
            status: FAIL,
            data: {
                message: "users not found"
            }
        })
    }
    res.status(200).json({
        status: SUCCESS,
        data: {
            users: data
        },
        userid :req.userid
    })
};
