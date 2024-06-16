import { z } from "zod"

export const insertInput = z.object({
  referrer: z.string(),
  screenWidth: z.number().min(0),
  screenHeight: z.number().min(0),
})
