import { type z } from "zod";
import { type gameMode } from "../contexts/GameInfoContext";
import { gameModeToStr } from "../utils/utilsFunctions";
import { type scoreReq } from "../zod/request";
import { leaderboardScores, msgRes } from "../zod/response";
import { fetchJson } from "./request";

export const getTopUsers = async (
  mode: gameMode, amount: number
) => 
  await fetchJson<z.infer<typeof leaderboardScores>>(
    `/leaderboard/top?amount=${amount}&mode=${gameModeToStr(mode)}`,{}, leaderboardScores
  )

export const saveScore = async (scoreObject: z.infer<typeof scoreReq>) =>
  await fetchJson<z.infer<typeof msgRes>>(
    "/leaderboard", {
      method: "POST",
      body: JSON.stringify(scoreObject),
      headers: { "Content-Type": "application/json", }
    }, msgRes
  );
