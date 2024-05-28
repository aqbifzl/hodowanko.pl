import { type gameInfo, gameMode } from "../contexts/GameInfoContext";
import { updateUser } from "../requestHandle/user";
import { readIdFromLocalStorage } from "../utils/utilsFunctions";
import {
  secondRewardIntervalMs, updateTimerIntervalMs, updateUserIntervalMs 
} from "../utils/utilsVariables";
import { updateUserReq } from "../zod/request";

export const gPerSecondReward = (setGameInfo: React.Dispatch<React.SetStateAction<gameInfo>>) => {
  const perSecondRewardInterval = setInterval(
    () => {
      setGameInfo((previous) => {
        if(previous.ran){
          return {
            ...previous,
            balance: previous.balance + previous.rewardPerSecond,
            wowQueue: [
              ...previous.wowQueue,
              ...Array.from(
                { length: previous.rewardPerSecond <= 5 ? previous.rewardPerSecond : 5 }, (
                  _, index
                ) => ({
                  id: previous.wowQueue.length + index,
                  pageX: 0,
                  pageY: 0 
                })
              ),
            ]
          }
        }
        return previous
      });
    }, secondRewardIntervalMs
  );
  return perSecondRewardInterval
}

export const gUpdateUser = (setGameInfo: React.Dispatch<React.SetStateAction<gameInfo>>) => {
  const updateUserInterval = setInterval(
    () => {
      setGameInfo((previous) => {
        if(readIdFromLocalStorage() && previous.mode === gameMode.FOREVER){
          updateUser(updateUserReq.parse({
            "id": readIdFromLocalStorage(),
            "points": previous.balance,
            "items": previous.shopItems.map(item => item.amount) 
          }))
            .catch(_ => console.error)
        }
        return previous
      });
    }, updateUserIntervalMs
  );
  return updateUserInterval
}

export const gUpdateTimer = (
  setGameInfo: React.Dispatch<React.SetStateAction<gameInfo>>,
  setShowScore: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const updateTimerInterval = setInterval(
    () => {
      setGameInfo((previous) =>{
        if(!previous.timeLeft){
          clearInterval(updateTimerInterval)
          return previous
        }

        if(previous.timeLeft - 0.1 <= 0){
          setShowScore(true)
          return {
            ...previous,
            timeLeft: 0.00,
            ran: false
          }
        }

        return {
          ...previous,
          timeLeft: previous.timeLeft - 0.01,
        }
      });
    }, updateTimerIntervalMs
  );
  return updateTimerInterval
}
