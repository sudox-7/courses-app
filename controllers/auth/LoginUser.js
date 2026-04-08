import { SUCCESS, ERROR, FAIL } from '../../utils/httpresstatus.js';
import UserSchema from '../../models/users.js';
import loginValidator from '../../middleware/loginvalid.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const Login = async (req, res) => {
    const parsed = loginValidator.safeParse(req.body);

    try {
        if (!parsed.success) {
            return res.status(400).json({
                status: FAIL,
                message: "invalid email or password",
            });
        }
        const { email, password } = parsed.data;
        const user = await UserSchema
            .findOne({ email })
            .select('+password');

        if (!user) {
            return res.status(401).json({
                status: FAIL,
                message: "invalid email or password",
            });
        }
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(401).json({
                status: FAIL,
                message: "invalid email or password",
        });
        }
        const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // ✅ SUCCESS CASE
        return res.status(200).json({
            status: SUCCESS,
            message: "user logged in successfully",
            data: {
                username: user.userName,
                email: user.email,

            },
            token: token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: ERROR,
            message: "internal server error",
        });
    }
};
