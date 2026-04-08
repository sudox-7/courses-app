import courses from '../../models/courses.js';
import { SUCCESS, ERROR } from '../../utils/httpresstatus.js';
export const GetMyCourses = async (req, res) => {
  const query = req.query
  const limit = Math.min(+query.limit || 10, 100);
  const page = Math.max(+query.page || 1, 1);
  const skip = (page - 1) * limit;
  try {
    const myCourses = await courses.find({ userId: req.userid }).limit(limit).skip(skip).lean();

    return res.status(200).json({
      status: SUCCESS,
      data: { courses: myCourses }
    });

  } catch (err) {
    return res.status(500).json({
      status: ERROR,
      message: "server error"
    });
  }
};