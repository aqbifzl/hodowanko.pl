import {
  useContext, useRef, useState 
} from "react"
import { GameInfoContext } from "../../contexts/GameInfoContext"
import { saveScore } from "../../requestHandle/leaderboard"
import { saveUser } from "../../requestHandle/user"
import {
  gameModeToStr, readIdFromLocalStorage, saveIdToLocalStorage 
} from "../../utils/utilsFunctions"
import { type PopupProps } from "../../utils/utilsTypes"
import { defaultContextVal } from "../../utils/utilsVariables"
import { scoreReq } from "../../zod/request"
import { ConfirmButton } from "../Buttons/ConfirmButton"
import { Leaderboard } from "../Leaderboard"
import Popup from "../Popup"


export const ScorePrompt = ({ setShow } : PopupProps) => {
  const gInfoContext = useContext(GameInfoContext)
  const [
    success, setSuccess
  ] = useState<boolean>(false)
  const [
    createMsg, setCreateMsg
  ] = useState<string | undefined>(undefined)
  if(!gInfoContext){
    throw new Error("Can't use game info context")
  }
  const {
    gameInfo,setGameInfo 
  } = gInfoContext
  const nickRef = useRef<HTMLInputElement | null>(null)
  const scoreBalance = gameInfo.balance

  const handleScoreSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    if(!readIdFromLocalStorage()){
      console.log("creating new user")
      if(!nickRef.current?.value)
        return
      if (nickRef.current.value.length < 4){
        setCreateMsg("Nick musi zawierac minimum 4 znaki")
        return
      }
      try{
        const result = await saveUser({
          "username": nickRef.current.value,
          "points": 0,
          "items": defaultContextVal.initItems.map(_ => 0),
        })

        saveIdToLocalStorage(result.id)
        setGameInfo((prevGameInfo) => ({
          ...prevGameInfo,
          shopItems: defaultContextVal.initItems.map(item => ({ ...item })),
        }));
      }catch(error){
        if(error instanceof Error)
          setCreateMsg(error.message)
      }
    }else{
      console.log("using the same user")
    }

    try{
      await saveScore(scoreReq.parse({
        "userId": readIdFromLocalStorage(),
        "mode": gameModeToStr(gameInfo.mode),
        "amount": gameInfo.balance 
      }))
      setCreateMsg("Zapisano!")
      setSuccess(true)
    }catch(err){
      if(err instanceof Error)
        setCreateMsg(err.message)
    }
  }

  return(
    <Popup>
      <div className="flex flex-col items-center relative">
        <div className="absolute right-0 top-0 cursor-pointer"
          onClick={() => setShow(false)}>
X
        </div>
        <div className="flex flex-col items-center">
          <p className="flex items-center justify-center mx-0 my-2.5">
            <span className="text-3xl">
              {" "}
Uzyskałeś
              <span className="text-click-btn text-5xl">{scoreBalance}</span>
            </span>
            <img className="w-[50px] ml-1"
              src="/piesel.png"
              alt=""/>
          </p>
          <p className="mx-0 my-2.5 text-3xl">WoW!</p>
        </div>
        <Leaderboard amount={15}
          mode={gameInfo.mode} />
        <div>
          <p className="mx-0 my-2.5 flex justify-center">
            <form className="m-0 p-0 flex flex-col"
              method="post"
              action="index.html">
              {!readIdFromLocalStorage() && (
                <p className="mx-0 my-2.5">
                  <label className="text-xl mr-1">Twoje imię:</label>
                  <input ref={nickRef}
                    min={4}
                    max={50}
                    className="text-sm rounded outline-none p-1
                    border border-solid border-input-border"
                    placeholder="Twoj nick"/>
                </p>
              )}

              {typeof createMsg === "string" &&
              <span className="text-center text-[#82ce25] my-1">{createMsg}</span>}
              {!success && (
                <div className="flex justify-center items-center flex-col w-full mb-2.5">
                  <ConfirmButton onClick={(e) => handleScoreSave(e)}
                    name={"Zapisz"}/>
                </div>
              )}
              <span className="text-xs">
                {readIdFromLocalStorage() 
                  ? "* wynik zostanie przypisany do obecnie uzywanego konta" 
                  : "* musisz wpisać swoje imię aby wynik został zapisany."}
              </span>
            </form>
          </p>
        </div>
      </div>
    </Popup>
  )
}
