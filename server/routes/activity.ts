/* eslint-disable @typescript-eslint/no-misused-promises */
import { Prisma } from ".prisma/client"
import express, { type Request, type Response } from "express"
import { sendJsonError } from "../utils/errors"
import { sendOKMessage } from "../utils/responses"
import { validate } from "../utils/validation"
import { insertInput } from "../zod/activityData"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

const activityRouter = express.Router()

activityRouter.post(
  "/", validate(insertInput), async (
    req:Request, res: Response
  ) => {
    try{
      const reqData = insertInput.parse(req)

      const ua = req.headers["user-agent"]
      const ip = req.ip
      const activityCookie = req.cookies["activity"]
      const hanalyticsUrl = process.env.HANALYTICS_URL
      const hanalyticsToken = process.env.HANALYTICS_INSERT_TOKEN

      const {referrer, screenWidth, screenHeight } = reqData.body

      if(!activityCookie && hanalyticsUrl && hanalyticsToken && ua && ip){
        await fetch(hanalyticsUrl, {
          method: "POST",
          body: JSON.stringify({
            ip,
            referrer,
            application: "hodowanko.pl",
            userAgent: ua,
            screenWidth,
            screenHeight
          }),
          headers: new Headers({
              "Authorization": hanalyticsToken, 
          }), 
        })

        res.cookie("activity", true, {
          expires: dayjs.extend(utc).utc().add(1, "day").toDate()
        })
      }

      sendOKMessage(
        res, "OK"
      )
    }catch(err){
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2003") {
          return sendJsonError(
            res, 400, "Invalid data"
          )
        }
      }
      return sendJsonError(
        res, 400, "Bad request"
      )
    }
  }
)

export default activityRouter
