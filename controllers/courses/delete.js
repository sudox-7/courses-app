import courses from "../../models/courses.js";
import { SUCCESS, FAIL, ERROR } from "../../utils/httpresstatus.js";

export const DeleteCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const deleted = await courses.findOneAndDelete({
      _id: courseId,
      userId: req.userid, 
    });

    if (!deleted) {
      return res.status(404).json({
        status: FAIL,
        message: "course not found",
      });
    }

    return res.status(200).json({
      status: SUCCESS,
      message: "course deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: ERROR,
      message: "Failed to delete course",
    });
  }
};