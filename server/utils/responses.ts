import { type Response } from "express"

export const sendOKMessage = (
  res: Response, content: string
) => {
  res.json({ msg: content })
}
