import express from 'express'
import { Create } from '../controllers/courses/create.js'
import { DeleteCourse } from '../controllers/courses/delete.js'
import { GetMyCourses } from '../controllers/courses/getMe.js'
import { Get } from '../controllers/courses/get.js'
import { Patch } from '../controllers/courses/patch.js'
import verify from '../middleware/jwtTokenVerify.js'

const router = express.Router()

router.route('/')
  .get(verify, Get)

router.route('/me')
  .get(verify, GetMyCourses)
  .post(verify, Create)

router.route('/me/:id')
  .patch(verify, Patch)
  .delete(verify, DeleteCourse)

export default router

