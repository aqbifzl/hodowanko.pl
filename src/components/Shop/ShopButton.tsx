import {
  useContext, useEffect, useState 
} from "react"
import { GameInfoContext, type shopButtonProp } from "../../contexts/GameInfoContext"
import { btnType } from "../../utils/utilsTypes"

interface Props{
  properties: shopButtonProp,
  handleClick: (id: number) => void
}

export const ShopButton = ({
  properties, handleClick 
}: Props) => {
  const {
    id, name,value,price,amount,type 
  } = properties
  const gInfoContext = useContext(GameInfoContext)
  if(!gInfoContext){
    throw new Error("Can't use game info context")
  }
  const { gameInfo } = gInfoContext

  const [
    isHovered, setIsHovered
  ] = useState<boolean>(false)
  const altText = `+ ${value} pieseł na ${type === btnType.CLICK ? " klik" : " sek."}`
  const btnColor = type === btnType.CLICK ? "bg-click-btn" : "bg-time-btn"
  const btnColorHover = type === btnType.CLICK ? "bg-click-btn-hover" : "bg-time-btn-hover"
  const priceColor = type === btnType.CLICK ? "text-click-btn" : "text-price-green"
  const [
    isActive, setIsActive
  ] = useState(gameInfo.balance >= Math.floor(price) && gameInfo.ran)

  useEffect(
    () => {
      if(gameInfo.balance >= Math.floor(price) && gameInfo.ran){
        setIsActive(true)
      }else{
        setIsHovered(false)
        setIsActive(false)
      }
    },[
      handleClick
    ]
  )

  return(
    <>
      <li 
        className={`mb-1 text-xs ${!isActive && "opacity-50"}
        flex items-center flex-col md:flex-row
        `}>
        <a className={`
            cursor-pointer text-sm py-[10px] px-[15px] hover:text-white
            mt-0.5 w-[160px] h-[20px] flex justify-between items-center
            border border-white rounded-md
            ${isHovered && isActive ? btnColorHover : btnColor} text-white
          `}
        onClick={() => handleClick(id)}
        onMouseEnter={() =>  setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
          <span className="text-[14px]">{isHovered ? altText : name}</span>
          <span className="float-right text-base text-[16px]">{amount}</span>
        </a>
        <span className="ml-2.5 mt-2 text-sm flex">
          <b className={`${priceColor}`}>{Math.floor(price)}</b>
          <img src="/piesel.png"
            className="max-h-[25px] ml-1"
          />
        </span>
      </li>
    </>
  )
}

export default ShopButton
