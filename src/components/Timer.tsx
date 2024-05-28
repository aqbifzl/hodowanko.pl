import { useContext } from "react"
import { GameInfoContext } from "../contexts/GameInfoContext"

export const Timer = () => {
  const gInfoContext = useContext(GameInfoContext)
  if(!gInfoContext){
    throw new Error("Can't use game info context")
  }
  const { gameInfo } = gInfoContext

  if(gameInfo.timeLeft === undefined)
    throw Error("Invalid use of timer")

  return(
    <div>
Pozostało Ci:
      <br/> 
      {" "}
      <span className="text-countdown-red">{gameInfo.timeLeft.toFixed(2)}</span>
      {" "}
sekund
    </div>
  )
}
