import express, { type Request, type Response } from "express"
import path from "path"
import { sendJsonError } from "./utils/errors"
import userRouter from "./routes/user"
import leaderboardRouter from "./routes/leaderboard"
import cors from "cors"
import activityRouter from "./routes/activity"
import cookieParser from "cookie-parser"

const app = express()
const port = 3001

app.use(cors())
app.use(cookieParser())
app.use(express.static(path.join(
  __dirname, "public"
)))
app.use(express.json())

app.use(
  "/user", userRouter
)
app.use(
  "/leaderboard", leaderboardRouter
)
app.use(
  "/activity", activityRouter
)

app.use((
  req: Request, res: Response
) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.listen(
  port, () => {
    console.log(`Server started on ${port}`)
  }
)
