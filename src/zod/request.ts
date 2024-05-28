import { z } from "zod"

export const amountOnlyItemsReq = z.array(z.number()).length(17)

export const newUserReq = z.object({
  username: z.string().min(4).max(50),
  points: z.number(),
  items: amountOnlyItemsReq
})

export const updateUserReq = z.object({
  id: z.string(),
  points: z.number().min(0),
  items: amountOnlyItemsReq
})

export const scoreReq = z.object({
  userId: z.string(),
  mode: z.string(),
  amount: z.number().min(0),
})
