import { z } from "zod";

export const shopElement = z.object({
  id: z.number(),
  amount: z.number()
})

export const shopItems = z.array(shopElement)

export enum schemaGameMode{"TIME30" = "TIME30","TIME60" = "TIME60", "FOREVER"= "FOREVER"}

export const basicScore = z.object({
  userId: z.string(),
  mode: z.nativeEnum(schemaGameMode),
  amount: z.number().min(0),
})

export const scoreReq = z.object({ body: basicScore })

