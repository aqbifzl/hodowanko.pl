import {
  useContext, useRef, useState 
} from "react"
import { GameInfoContext } from "../../contexts/GameInfoContext"
import { type PopupProps } from "../../utils/utilsTypes"
import { defaultContextVal, restoreUrl } from "../../utils/utilsVariables"
import { ConfirmButton } from "../Buttons/ConfirmButton"
import Popup from "../Popup"
import {
  readIdFromLocalStorage, restoreUserAndApply, saveIdToLocalStorage 
} from "../../utils/utilsFunctions"
import { saveUser } from "../../requestHandle/user"

export const SavePrompt = ({ setShow }: PopupProps) => {
  const nickRef = useRef<HTMLInputElement | null>(null)
  const restoreRef = useRef<HTMLInputElement | null>(null)
  const [
    createMsg, setCreateMsg
  ] = useState<undefined | string>(undefined)
  const [
    restoreMsg, setRestoreMsg
  ] = useState<undefined | string>(undefined)
  const [
    linkCopied, setLinkCopied
  ] = useState<boolean>(false)
  const [
    codeCopied, setCodeCopied
  ] = useState<boolean>(false)

  const gInfoContext = useContext(GameInfoContext)
  if(!gInfoContext){
    throw new Error("Can't use game info context")
  }

  const {
    gameInfo,setGameInfo 
  } = gInfoContext

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() 
    if(nickRef.current?.value === undefined)
      throw new Error("Error reading input content")

    if (nickRef.current.value.length < 4) {
      setCreateMsg("Nick musi zawierac minimum 4 znaki")
      return;
    }

    const restartValues = !!readIdFromLocalStorage()

    try{
      const result = await saveUser({
        "username": nickRef.current.value,
        "points": restartValues ? 0 : gameInfo.balance,
        "items": (restartValues? gameInfo.initItems :gameInfo.shopItems).map(item => item.amount)
      })

      saveIdToLocalStorage(result.id)
      setGameInfo((prevGameInfo) => {
        defaultContextVal.shopItems.map((
          _, index
        ) => {
          return { ...prevGameInfo.initItems[index] }
        })
        return ({
          ...prevGameInfo,
          ran: true,
        })
      });
      setCreateMsg("Stworzono")
    }catch(error){
      if(error instanceof Error)
        setCreateMsg(error.message)
    }
  }

  const handleRestore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() 
    if(restoreRef.current?.value === undefined)
      throw new Error("Error reading input content")

    if(restoreRef.current.value.length <= 0){
      setRestoreMsg("Nieprawidłowy kod")
      return
    }

    try{
      await restoreUserAndApply(
        restoreRef.current.value, setGameInfo
      )
    }catch(_) {
      setRestoreMsg("Nieprawidłowy kod")
    }
  }
  
  const handleCopyClick = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    setMessage: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await navigator.clipboard.writeText(e.currentTarget.value)
    setMessage(true)

    setTimeout(
      () => {
        setMessage(false)
      }, 2000
    )
  }

  const userId = readIdFromLocalStorage()

  return(
    <Popup className={"text-center"}>
      <div className="relative">
        <div className="absolute right-0 top-0 cursor-pointer"
          onClick={() => setShow(false)}>
X
        </div>
        <form className="m-0 p-0 flex justify-around flex-col">
          <div className="flex flex-col lg:flex-row lg:justify-around">
            <p className="mx-0 my-2.5 flex flex-col items-center">
              <label className="text-xl mr-1">Zapisz</label>
              {createMsg && 
                <div className="bg-click-btn px-1 rounded p-2 text-white m-5">{createMsg}</div>}
              <input ref={nickRef}
                min={4}
                max={50}
                className="text-sm rounded outline-none p-1 border
                border-solid border-input-border m-1 w-full"
                placeholder="Twoj nick"/>
              <ConfirmButton onClick={handleSave}
                name={"Zapisz"}/>
            </p>
            {userId && (
              <>
                <p className="mx-0 my-2.5 flex flex-col items-center">
                  <label className="text-xl mr-1">Link:</label>
                  <input readOnly
                    onClick={(e) => handleCopyClick(
                      e, setLinkCopied
                    )}
                    className="text-sm rounded cursor-pointer 
                    outline-none p-2 border border-solid border-input-border w-full"
                    value={new URL(window.location.href).host+restoreUrl+userId}/>
                  {linkCopied && (
                    <div className="max-w-[120px] border-0 cursor-pointer 
                    rounded outline-none text-white bg-[#82ce25] py-1 px-2.5 text-sm mt-1">
                      Skopiowano
                    </div>
                  )}
                </p>
                <p className="mx-0 my-2.5 flex flex-col items-center">
                  <label className="text-xl mr-1">Kod:</label>
                  <input readOnly
                    onClick={(e) => handleCopyClick(
                      e, setCodeCopied
                    )}
                    className="text-sm rounded cursor-pointer outline-none
                    p-1 border border-solid border-input-border w-full"
                    value={userId}/>
                  {codeCopied && (
                    <div 
                      className="max-w-[120px] border-0 cursor-pointer rounded
                      outline-none text-white bg-[#82ce25] py-1 px-2.5 text-sm mt-1">
                      Skopiowano
                    </div>
                  )}
                </p>
              </>
            )}
          </div>
          <hr className="w-full"/>
          <p className="mx-0 my-2.5 flex flex-col items-center">
            <label className="text-xl mr-1">Przywróć z kodem</label>
            <input ref={restoreRef}
              className="text-sm rounded outline-none mb-1 p-1
              border border-solid border-input-border" />
            {restoreMsg &&
              <div className="bg-click-btn px-1 rounded p-2 text-white m-5">{restoreMsg}</div>}
            <ConfirmButton onClick={async (e) => {await handleRestore(e)}}
              name={"Zapisz"}/>
          </p>
        </form>
        <p>
        Przywróć zapis z kodem lub użyj tego linku
        </p>
      </div>
    </Popup>
  )
}
