import { type PopupPropsWithGameMode } from "../../utils/utilsTypes"
import { Leaderboard } from "../Leaderboard"
import Popup from "../Popup"

export const LeaderboardPrompt = ({
  setShow,mode 
} : PopupPropsWithGameMode) => {
  return(
    <Popup className={"text-center"}>
      <div className="relative">
        <div className="absolute right-0 top-0 cursor-pointer"
          onClick={() => setShow(false)}>
X
        </div>
        <Leaderboard amount={30}
          mode={mode}/>
      </div>
    </Popup>
  )
}
