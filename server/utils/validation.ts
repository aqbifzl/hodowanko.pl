import {
  type NextFunction, type Request, type Response 
} from "express"
import { type AnyZodObject } from "zod"
import { sendJsonError } from "./errors"

export const validate = (schema: AnyZodObject) => {
  return async (
    req: Request, res: Response, next: NextFunction
  ) => {
    try{
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query
      } as { body?: unknown; params?: unknown; query?: unknown })
      next()
    }catch(err){
      console.error(err)
      return sendJsonError(
        res, 400, "Bad request"
      )
    }
  }
}
