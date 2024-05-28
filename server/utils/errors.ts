import { type Response } from "express"

export const sendJsonError = (
  res: Response, code: number, content: string
) => {
  res.status(code).json({ error: content })
}

export enum throwErrors{USER_NOT_FOUND, INVALID_OPERATION}
