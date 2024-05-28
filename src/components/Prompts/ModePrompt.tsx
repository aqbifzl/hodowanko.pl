import { useContext } from "react"
import {
  GameInfoContext, gameMode, modeTimeLeft 
} from "../../contexts/GameInfoContext"
import { type PopupProps } from "../../utils/utilsTypes"
import { defaultContextVal } from "../../utils/utilsVariables"
import { RankingButton } from "../Buttons/RankingButton"
import Popup from "../Popup"

interface PopupWithRankingProps extends PopupProps {
  setShowRanking: React.Dispatch<React.SetStateAction<boolean>>
  setLeaderboardMode: React.Dispatch<React.SetStateAction<gameMode>>
}

interface modeButtonProperty{
  name: string
  mode: gameMode
  color: string
}

export const ModePrompt = ({
  setShow, setShowRanking, setLeaderboardMode 
} : PopupWithRankingProps) => {
  const gInfoContext = useContext(GameInfoContext)
  if(!gInfoContext){
    throw new Error("Can't use game info context")
  }

  const {
    gameInfo,setGameInfo 
  } = gInfoContext

  const changeMode = (newMode: gameMode) => {
    let timeLeft: undefined | number = undefined
    if(newMode === gameMode.FOREVER){
      timeLeft = undefined
    }else{
      timeLeft = modeTimeLeft[newMode]
    }

    setGameInfo({
      ...defaultContextVal,
      mode: newMode,
      timeLeft
    })
  }

  const closePrompt = () => {
    setShow(false)
    setLeaderboardMode(gameInfo.mode)
  }

  const allButtons: modeButtonProperty[] = [
    {
      name: "30 sekund Pieseł",
      mode: gameMode.TIME30,
      color: "bg-click-btn" 
    },
    {
      name: "60 sekund Pieseł",
      mode: gameMode.TIME60,
      color: "bg-time-btn" 
    },
    {
      name: "FOREVER Pieseł",
      mode: gameMode.FOREVER,
      color: "bg-[#4848e7]" 
    },
  ]

  return(
    <Popup>
      <div className="relative">
        <div className="absolute right-0 top-0 cursor-pointer"
          onClick={() => closePrompt()}>
X
        </div>
        <div className="text-xl mb-2.5">Wybierz tryb gry:</div>
        <ul className="text-center list-none m-0 p-0 flex">
          {allButtons.map(btn => (
            <li className="mx-0.5 bg-red">
              <span 
                className={`block rounded ${btn.color} p-2.5 text-white text-sm
                cursor-pointer ${gameInfo.mode != btn.mode && "opacity-50"}`}
                onClick={() => changeMode(btn.mode)}>
                {btn.name}
              </span>
              <RankingButton setLeaderboard={setShowRanking}
                mode={btn.mode}
                setLeaderboardMode={setLeaderboardMode}/>
            </li>
          ))}
        </ul>
      </div>
    </Popup>
  )
}
