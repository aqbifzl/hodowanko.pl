/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type Response } from "express"
import { validate } from "../utils/validation"
import express from "express"
import { sendJsonError, throwErrors } from "../utils/errors"
import {
  addUser, getUser, updateUser 
} from "../utils/database"
import { Prisma } from "@prisma/client"
import { type z } from "zod"
import { sendOKMessage } from "../utils/responses"
import {
  userIdReq, newUserReq, updateUserReq 
} from "../zod/requestData"
import { type shopItems } from "../zod/generalData"

const userRouter = express.Router()

userRouter.get(
  "/:id", validate(userIdReq), async (
    req: Request, res: Response
  ): Promise<void> => {
    try{
      const requestedId = userIdReq.parse(req).params.id
      const user = await getUser(requestedId)

      if(!user)
        throw throwErrors.USER_NOT_FOUND

      const {
        id, points, ShopItems: items, username 
      } = user

      res.send({
        id,
        points,
        items,
        username 
      })
    }catch(err){
      if(err === throwErrors.USER_NOT_FOUND){
        return sendJsonError(
          res, 404, "User not found"
        )
      }
      return sendJsonError(
        res, 400, "Bad request"
      )
    }
  }
)

userRouter.post(
  "/", validate(newUserReq), async (
    req: Request, res: Response
  ) => {
    try{
      const rUser = newUserReq.parse(req)
      const {
        points: rPoints, username: rUsername, items: rItems 
      } = rUser.body

      const items: z.infer<typeof shopItems> = rItems.map((
        item,i
      ) => {
        return {
          id: i+1,
          amount: item 
        }
      })

      const createdUser = await addUser(
        rUsername, rPoints, items
      )

      res.send({ id: createdUser.id })
    }catch(err){
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return sendJsonError(
            res, 400, "Uzytkownik juz istnieje"
          )
        }
      }
      return sendJsonError(
        res, 400, "Bad request"
      )
    }
  }
)

userRouter.patch(
  "/", validate(updateUserReq), async (
    req: Request, res: Response
  ) => {
    try{
      const reqData = updateUserReq.parse(req)
      const user = await getUser(reqData.body.id)

      if(!user)
        throw throwErrors.USER_NOT_FOUND

      user.ShopItems.forEach((
        currentItem, i
      ) => {
        if(currentItem.amount > reqData.body.items[i]){
          throw throwErrors.INVALID_OPERATION
        }
      })

      await updateUser(
        user.id, reqData.body.points, reqData.body.items
      )

      sendOKMessage(
        res, "OK"
      )
    }catch(err){
      switch(err){
      case throwErrors.USER_NOT_FOUND:
        return sendJsonError(
          res, 404, "User not found"
        )
      case throwErrors.INVALID_OPERATION:
        console.error(`Suspecious action from ${req.ip}`)
        return sendJsonError(
          res, 400, "Bad request"
        )
      default:
        return sendJsonError(
          res, 400, "Bad request"
        )
      }
    }
  }
)

export default userRouter
