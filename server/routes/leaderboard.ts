/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from "express"
import { validate } from "../utils/validation"
import {
  createScore,  getTopForeverScores,  getTopScores 
} from "../utils/database"
import { sendJsonError } from "../utils/errors"
import { sendOKMessage } from "../utils/responses"
import { Prisma } from "@prisma/client"
import { topScoresReq } from "../zod/requestData"
import { schemaGameMode, scoreReq } from "../zod/generalData"

const leaderboardRouter = express.Router()

interface leaderboardData{
  username: string
  points: number
  createdAt: Date
}

leaderboardRouter.get(
  "/top", validate(topScoresReq), async (
    req:Request, res: Response
  ) => {
    try{
      const reqData = topScoresReq.parse(req)
      const {
        amount,mode 
      } = reqData.query

      if(mode === schemaGameMode.FOREVER){
        const dbData = await getTopForeverScores(amount)
        const result: leaderboardData[] = dbData.map(item => ({
          username: item.username,
          points: item.points,
          createdAt: item.createdAt 
        }))
        res.send(result)
      }else{
        const dbData = await getTopScores(
          amount, mode
        )
        const result: leaderboardData[] = dbData.map(item => ({
          username: item.User.username,
          points: item.amount,
          createdAt: item.createdAt 
        }))
        res.send(result)
      }
    }catch(err){
      return sendJsonError(
        res, 400, "Bad request"
      )
    }
  }
)

leaderboardRouter.post(
  "/", validate(scoreReq), async (
    req:Request, res: Response
  ) => {
    try{
      const reqData = scoreReq.parse(req)
      await createScore(reqData)

      sendOKMessage(
        res, "OK"
      )
    }catch(err){
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2003") {
          return sendJsonError(
            res, 400, "User not found"
          )
        }
      }
      return sendJsonError(
        res, 400, "Bad request"
      )
    }
  }
)

export default leaderboardRouter
