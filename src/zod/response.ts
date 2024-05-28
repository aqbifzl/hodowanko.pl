import { z } from "zod"

export const errorRes = z.object({ error: z.string() })

export const idRes = z.object({ id: z.string() })

export const msgRes = z.object({ msg: z.string() })

export const userRes = z.object({
  id: z.string(),
  points: z.number(),
  username: z.string(),
  items: z.array(z.object({
    id: z.number(),
    amount: z.number()
  })).length(17)
})

export const leaderboardScores = z.array(z.object({
  username: z.string(),
  points: z.number(),
  createdAt: z.string().datetime()
}))
