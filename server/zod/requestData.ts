import { z } from "zod";
import { schemaGameMode } from "./generalData";

export const userIdReq = z.object({ params: z.object({ id: z.string() }) })

export const amountOnlyItemsReq = z.array(z.number()).length(17)

export const newUserReq = z.object({
  body: z.object({
    username: z.string().min(4).max(50),
    points: z.number(),
    items: amountOnlyItemsReq
  }) 
})

export const updateUserReq = z.object({
  body: z.object({
    id: z.string(),
    points: z.number().min(0),
    items: amountOnlyItemsReq
  }) 
})

export const topScoresReq = z.object({
  query: z.object({
    amount: z.string().transform(Number)
      .refine(value => typeof value === "number"
            && !isNaN(value) && value >= 1 && value <= 100),
    mode: z.nativeEnum(schemaGameMode)
  }), 
})
