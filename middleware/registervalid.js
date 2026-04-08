import { z } from 'zod'
const registerz = z.object({
  userName: z.string().min(3).max(12),
  email: z.string().trim().email(),
  password: z.string().min(8).max(14),
});

export default registerz 