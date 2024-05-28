import { PrismaClient } from "@prisma/client"
import { type z } from "zod"
import { type amountOnlyItemsReq } from "../zod/requestData"
import {
  schemaGameMode, type scoreReq, type shopItems 
} from "../zod/generalData"

const prisma = new PrismaClient()

export const addUser = async (
  username: string, points: number, items: z.infer<typeof shopItems>
) => await prisma.user.create({
  data: {
    username,
    points,
    ShopItems: { create: items }
  } 
})

export const getUser = async(id: string) => await prisma.user.findFirst({
  where: { id },
  include: {
    ShopItems: {
      select: {
        id: true,
        amount: true
      } 
    } 
  }
})

export const updateUser = async (
  id: string, nBalance: number, nItems: z.infer<typeof amountOnlyItemsReq>
) => 
  await prisma.$transaction([
    prisma.user.update({
      where: { id },
      data: { points: nBalance, }
    }),
    ...nItems.map((
      item, i
    ) => prisma.shopItem.update({
      where: {
        userId_id: {
          id: i + 1,
          userId: id
        } 
      },
      data: { amount: item }
    })),
  ])

export const createScore = async ({
  body: {
    userId, amount, mode 
  } 
}: z.infer<typeof scoreReq>) => await prisma.score.create({
  data: {
    userId,
    mode: mode === schemaGameMode.TIME30 ? "TIME30" : "TIME60",
    amount
  } 
})

export const getTopScores = async (
  amount: number, mode: schemaGameMode.TIME30 | schemaGameMode.TIME60
) => await prisma.score.findMany({
  select: {
    createdAt: true,
    amount: true,
    User: { select: { username: true } }
  },
  distinct: [
    "userId"
  ],
  orderBy: { amount: "desc" },
  where: { mode },
  take: amount
})

export const getTopForeverScores = async (amount: number) => await prisma.user.findMany({
  select: {
    username: true,
    createdAt: true,
    points: true
  },
  orderBy: { points: "desc" },
  distinct: [
    "id"
  ],
  take: amount
})
