import type React from "react";
import { createContext } from "react";
import { type btnType } from "../utils/utilsTypes"

type gameInfoState = {
  gameInfo: gameInfo,
  setGameInfo: React.Dispatch<React.SetStateAction<gameInfo>>
}

export enum gameMode{"FOREVER"=2,"TIME60"=0,"TIME30"=1}
export const modeTimeLeft = [
  60, 30
]

export interface wowObject{
  id: number
  pageX: number
  pageY: number
}

export interface shopButtonProp {
  id: number,
  name: string,
  value: number,
  price: number,
  amount: number,
  type: btnType
}

export type gameInfo = {
  ran: boolean
  balance: number
  rewardPerClick: number
  rewardPerSecond: number
  respectQueue: number[]
  wowQueue: wowObject[]
  mode: gameMode
  shopItems: shopButtonProp[]
  initItems: shopButtonProp[]
  timeLeft?: number
}

export const GameInfoContext = createContext<gameInfoState | null>(null)
