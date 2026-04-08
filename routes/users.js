import express from 'express';
import { GetUser } from '../controllers/users/GetUsers.js';
import { Register } from '../controllers/auth/RegisterUser.js';
import { Login } from '../controllers/auth/LoginUser.js';
import verify from '../middleware/jwtTokenVerify.js';
import Adminverify from '../middleware/roleverefy.js';
import { loginLimiter, registerLimiter } from '../middleware/ratelimiter.js';

const router = express.Router();

router.post('/register',registerLimiter,Register);
router.post('/login',loginLimiter,Login);
router.get('/',verify,Adminverify,GetUser);
    


export default router 
