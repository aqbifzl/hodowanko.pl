import { type gameInfo, gameMode } from "../contexts/GameInfoContext";
import { restoreUserAndApply } from "../utils/utilsFunctions";
import { respectAnimationDurationMs, wowAnimationDurationMs } from "../utils/utilsVariables";

export const restoreUserIfPossible = (
  userId: string | null, gameInfo: gameInfo,
  setGameInfo: React.Dispatch<React.SetStateAction<gameInfo>>
) => {
  if(gameInfo.mode == gameMode.FOREVER && userId){
    restoreUserAndApply(
      userId,setGameInfo
    )
      .catch(console.error);
  }
}

export const updateButtonEffects = (
  gameInfo: gameInfo, setGameInfo: React.Dispatch<React.SetStateAction<gameInfo>>
) => {
  const removeRespect = (index: number) => {
    setGameInfo((previous) => ({
      ...previous,
      respectQueue: previous.respectQueue.filter((
        _, i
      ) => i !== index),
    }));
  };
  const removeWow = (index: number) => {
    setGameInfo((previous) => ({
      ...previous,
      wowQueue: previous.wowQueue.filter((
        _, i
      ) => i !== index),
    }));
  };

  const respectTimeouts: NodeJS.Timeout[] = [
  ];
  const wowTimeouts: NodeJS.Timeout[] = [
  ];

  gameInfo.respectQueue.forEach((
    _, index
  ) => {
    const timeoutId = setTimeout(
      () => {
        removeRespect(index);
      }, respectAnimationDurationMs
    ); 
    respectTimeouts.push(timeoutId);
  });

  gameInfo.wowQueue.forEach((
    _, index
  ) => {
    const timeoutId = setTimeout(
      () => {
        removeWow(index);
      }, wowAnimationDurationMs
    ); 
    wowTimeouts.push(timeoutId);
  });

  return({
    respectTimeouts,
    wowTimeouts 
  })
}
