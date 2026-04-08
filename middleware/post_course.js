import { z } from "zod";

const CourseVerification = z.object({
    name: z.string().trim().max(100),
    price: z.coerce.number().max(999999),
});

export default CourseVerification;