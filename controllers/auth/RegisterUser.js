import userschema from '../../models/users.js';
import { FAIL, SUCCESS } from '../../utils/httpresstatus.js';
import bcrypt from 'bcrypt';
import registerz from '../../middleware/registervalid.js';
import {USER} from '../../utils/roles.js'

export const Register = async (req, res) => {
  const data = req.body
  const parsed = registerz.safeParse(data)

  if (!parsed.success) {
    return res.status(400).json({
      status: FAIL,
      message: "invalid email or password ",
      error: parsed.error.issues
    })
  }
  const { userName, email, password  } = parsed.data
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const userdata = {
      userName,
      email,
      password: hashedpassword,
      role : USER,
    };
    const CreatedUser = await userschema.create(userdata);
    return res.status(201).json({
      status: SUCCESS,
      message: "user registred successfuly",
      data: {
        id: CreatedUser._id,
        userName: CreatedUser.userName,
        email: CreatedUser.email,
        role : CreatedUser.role
      }
    })
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({
        status: FAIL,
        message: "user already exist try to login",
      })
    }
    return res.status(500).json({
      status: FAIL,
      error: err.message
    })
  }

};