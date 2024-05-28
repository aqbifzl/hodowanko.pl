import {
  type gameInfo, gameMode, type shopButtonProp 
} from "../contexts/GameInfoContext";
import { restoreFromId } from "../requestHandle/user";
import { btnType } from "./utilsTypes";
import { defaultContextVal, localStorageIdName } from "./utilsVariables";

export const getRandomInt = (
  min:number, max:number
) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const saveIdToLocalStorage = (id: string) => {
  localStorage.setItem(
    localStorageIdName, id
  )
}

export const readIdFromLocalStorage = () => {
  return localStorage.getItem(localStorageIdName)
}

export const gameModeToStr = (mode: gameMode) => {
  switch (mode) {
  case gameMode.FOREVER:
    return "FOREVER" 
  case gameMode.TIME30:
    return "TIME30" 
  case gameMode.TIME60:
    return "TIME60" 
  default:
    return "???"
  }
}

export const restoreUserAndApply = async (
  id: string,setState: React.Dispatch<React.SetStateAction<gameInfo>>
) => {
  const data = await restoreFromId(id)

  setState((prevGameInfo) => {
    let newRewardPerClick=1
    let newRewardPerSec=0

    const updatedShopItems = prevGameInfo.initItems.map((
      item: shopButtonProp, index: number
    ) => {
      const deductedBtnType = prevGameInfo.initItems[index].type
      const value = prevGameInfo.initItems[index].value * data.items[index].amount;
      deductedBtnType === btnType.CLICK
        ? (newRewardPerClick += value)
        : (newRewardPerSec += value);

      return {
        ...item,
        amount: data.items[index].amount,
        price: defaultContextVal.shopItems[index].price * Math.pow(
          1.3,data.items[index].amount
        ),
      }
    });

    saveIdToLocalStorage(data.id)
    return {
      ...prevGameInfo,
      balance: data.points,
      shopItems: updatedShopItems,
      mode: gameMode.FOREVER,
      ran: true,
      rewardPerSecond: newRewardPerSec,
      rewardPerClick: newRewardPerClick
    };
  });
}
