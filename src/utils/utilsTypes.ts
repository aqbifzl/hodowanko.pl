import { type gameMode } from "../contexts/GameInfoContext"

export enum btnType{CLICK, TIME}

export interface PopupProps{
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PopupPropsWithGameMode extends PopupProps {
  mode: gameMode
}
