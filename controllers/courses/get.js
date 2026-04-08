import courses from '../../models/courses.js';
import { SUCCESS, ERROR } from '../../utils/httpresstatus.js';

export const Get = async (req, res) => {
  const query = req.query
  const limit = Math.min(+query.limit || 10, 100);
  const page = Math.max(+query.page || 1, 1);
  const skip = (page - 1) * limit;
  console.log(query);
  try {

    const allCourses = await courses.find({})
      .limit(limit)
      .skip(skip)
      .lean();

    res.status(200).json({
      status: SUCCESS,
      data: {
        courses: allCourses
      }
    });

  } catch (err) {

    res.status(500).json({
      status: ERROR,
      message: "Failed to fetch courses",
      data: {
        error: err.message
      }
    });

  }
};
