import {  z } from 'zod';

const loginValidator = z.object({
    email : z.string().max(100).email().trim(),
    password : z.string().min(8).max(14).trim()
})
export default  loginValidator