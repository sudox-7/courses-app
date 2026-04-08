import courses from '../../models/courses.js';
import CourseVerification from '../../middleware/post_course.js'
import { SUCCESS, FAIL, ERROR } from '../../utils/httpresstatus.js';

export const Create = async (req, res) => {
  try {
    const body = CourseVerification.safeParse(req.body)
    if (!body.success) {
      return res.status(400).json({
        status: ERROR,
        data: {
          course: body.error
        }
      })
    }
    const { name , price } = body.data ;
    const data = {
      userId : req.userid,
      name , 
      price 
    }
    const course = await courses.create(data);

    res.status(201).json({
      status: SUCCESS,
      data: {
        course: course
      }
    });

  } catch (err) {

    res.status(400).json({
      status: FAIL,
      data: {
        message: "Failed to create course",
        error: err.message
      }
    });

  }
};

