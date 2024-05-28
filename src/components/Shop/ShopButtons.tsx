import { useContext } from "react";
import { GameInfoContext, type shopButtonProp } from "../../contexts/GameInfoContext";
import { btnType } from "../../utils/utilsTypes";
import { GroupOfButtons } from "./GroupOfButtons";
import ShopButton from "./ShopButton"

export const ShopButtons = () => {
  const gInfoContext = useContext(GameInfoContext)
  if(!gInfoContext){
    throw new Error("Can't use game info context")
  }
  const {
    gameInfo, setGameInfo 
  } = gInfoContext

  const handleButtonClick = (id: number) => {
    if (!gameInfo.ran)
      return;

    setGameInfo((prevGameInfo) => {
      const updatedShopItems = prevGameInfo.shopItems.map((item: shopButtonProp) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            amount: item.amount + 1,
            price: item.price * 1.3
          }
          return updatedItem;
        }
        return item
      });

      const clickedItem = prevGameInfo.shopItems.find(i => i.id === id);

      if(!clickedItem)
        return prevGameInfo

      if(prevGameInfo.balance < Math.floor(clickedItem.price))
        return prevGameInfo

      return {
        ...prevGameInfo,
        respectQueue: [
          ...prevGameInfo.respectQueue, prevGameInfo.respectQueue.length
        ],
        balance: prevGameInfo.balance - Math.floor(clickedItem.price),
        rewardPerClick: clickedItem?.type === btnType.CLICK 
          ? prevGameInfo.rewardPerClick + clickedItem.value 
          : prevGameInfo.rewardPerClick,
        rewardPerSecond: clickedItem?.type === btnType.TIME 
          ? prevGameInfo.rewardPerSecond + clickedItem.value 
          : prevGameInfo.rewardPerSecond,
        shopItems: updatedShopItems,
      };
    });
  }

  return(
    <div className="flex md:flex-col flex-row xl:flex-row w-full xl:w-3/5">
      <GroupOfButtons name={"Motywacja:"}>
        {gameInfo.shopItems.map(item => item.type === btnType.CLICK && (
          <ShopButton properties={item}
            handleClick={handleButtonClick} />
        ))}
      </GroupOfButtons>
      <GroupOfButtons name={"Hodowla:"}>
        {gameInfo.shopItems.map(item => item.type === btnType.TIME && (
          <ShopButton properties={item}
            handleClick={handleButtonClick} />
        ))}
      </GroupOfButtons>
    </div>
  )
}
