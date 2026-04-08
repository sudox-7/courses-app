import courses from "../../models/courses.js";
import { SUCCESS, FAIL, ERROR } from "../../utils/httpresstatus.js";
import CourseVerification from '../../middleware/post_course.js'

export const Patch = async (req, res) => {
    const courseId = req.params.id;
    const parsed = CourseVerification.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            status: FAIL,
            message: "invalid course data",
            data: { error: parsed.error },
        });
    }

    try {
        const updated = await courses.findOneAndUpdate(
            { _id: courseId, userId: req.userid },
            parsed.data,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                status: FAIL,
                message: "course not found (or not yours)",
            });
        }

        return res.status(200).json({
            status: SUCCESS,
            data: { course: updated },
        });
    } catch (err) {
        return res.status(500).json({
            status: ERROR,
            message: "Error encountered during the update process",
        });
    }
};