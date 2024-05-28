import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { BasicButton } from "./components/Buttons/BasicButton";
import GlobalError from "./components/Errors/GlobalError";
import { PieselButton } from "./components/PieselButton";
import { LeaderboardPrompt } from "./components/Prompts/LeaderboardPrompt";
import { ModePrompt } from "./components/Prompts/ModePrompt";
import { SavePrompt } from "./components/Prompts/SavePrompt";
import { ScorePrompt } from "./components/Prompts/ScorePrompt";
import { ShopButtons } from "./components/Shop/ShopButtons";
import { Timer } from "./components/Timer";
import {
  type gameInfo, GameInfoContext, gameMode 
} from "./contexts/GameInfoContext"
import { restoreUserIfPossible, updateButtonEffects } from "./globalFunctions/functions";
import {
  gPerSecondReward, gUpdateTimer, gUpdateUser 
} from "./globalFunctions/intervals";
import { readIdFromLocalStorage } from "./utils/utilsFunctions";
import { defaultContextVal } from "./utils/utilsVariables";

export const Main = () => {
  const [
    gameInfo, setGameInfo
  ] = useState<gameInfo>(defaultContextVal);
  const [
    showMode, setShowMode
  ] = useState<boolean>(false)
  const [
    showScore, setShowScore
  ] = useState<boolean>(false)
  const [
    showLeaderboard, setShowLeaderboard
  ] = useState<boolean>(false)
  const [
    showSave, setShowSave
  ] = useState<boolean>(false)
  const [
    leaderboardMode, setLeaderboardMode
  ] = useState<gameMode>(gameInfo.mode)
  const { restoreId } = useParams()

  useEffect(
    () => {
      restoreUserIfPossible(
        restoreId ?? readIdFromLocalStorage(), gameInfo, setGameInfo
      )
    },[
      gameInfo.mode
    ]
  )

  useEffect(
    () => {
      const perSecondRewardInterval = gPerSecondReward(setGameInfo)
      const updateUserInterval = gUpdateUser(setGameInfo)

      return () => {
        clearInterval(perSecondRewardInterval)
        clearInterval(updateUserInterval)
      };
    }, [
    ]
  );

  useEffect(
    () => {
      if(!gameInfo.ran || gameInfo.mode === gameMode.FOREVER || !gameInfo.timeLeft)
        return

      const updateTimerInterval = gUpdateTimer(
        setGameInfo,setShowScore
      )

      return () => clearInterval(updateTimerInterval);
    },[
      gameInfo.ran
    ]
  )

  useEffect(
    () => {
      const {
        respectTimeouts, wowTimeouts 
      } = updateButtonEffects(
        gameInfo,setGameInfo
      )

      return () => {
        respectTimeouts.forEach(clearTimeout)
        wowTimeouts.forEach(clearTimeout)
      };
    }, [
      gameInfo.respectQueue, gameInfo.wowQueue
    ]
  );

  return (
    <>
      <ErrorBoundary fallback={<GlobalError/>}>
        <GameInfoContext.Provider value={{
          gameInfo,
          setGameInfo 
        }}>
          <div className="w-full md:w-4/5 xl:w-[1200px] my-0 mx-auto text-black rounded-sm">
            <img className="block w-full mx-auto max-w-[1260px] min-h-[80px]
            max-h-[163px] bg-transparent bg-no-repeat bg-cover bg-center object-cover"
            src="/top.png"/>
            <div className="p-2 lg:p-5 bg-white flex flex-col md:flex-row w-full">
              <div className="text-center w-full xl:w-2/5 flex flex-col items-center">
                <div className="mb-5 text-[35px]">
                  Posiadasz 
                  {" "}
                  <br/> 
                  {" "}
                  <span>{Math.round(gameInfo.balance).toLocaleString()}</span>
                  <br/> 
                  {" "}
                  <b className="text-[50px]">Pieseł</b>
                </div>
                <span className="text-[30px] text-time-btn">
                  <span>{gameInfo.rewardPerSecond}</span>
                  {" "}
na sekundę
                </span>
                <span className="text-click-btn text-[30px] mb-5">
                  <span>{gameInfo.rewardPerClick}</span>
                  {" "}
za klika
                </span>
                {gameInfo.mode != gameMode.FOREVER && (
                  <div className="mb-5 text-3xl">
                    <Timer/>
                  </div>
                )}
                <PieselButton/>
                <p className="text-center m-0 text-[16px]">
                  <BasicButton name="Tryb"
                    onClick={() => setShowMode(true)}/>
                  <BasicButton name="Sejwowanko"
                    onClick={() => setShowSave(true)}/>
                  <BasicButton name="Ranking"
                    onClick={() => setShowLeaderboard(true)}/>
                </p>
              </div>
              <ShopButtons/>
            </div>
          </div>
          {showScore && <ScorePrompt setShow={setShowScore}/>}
          {showMode && (
            <ModePrompt setShow={setShowMode}
              setShowRanking={setShowLeaderboard}
              setLeaderboardMode={setLeaderboardMode}/>
          )}
          {showLeaderboard && (
            <LeaderboardPrompt setShow={setShowLeaderboard}
              mode={leaderboardMode}/>
          )}
          {showSave && <SavePrompt setShow={setShowSave}/>}
        </GameInfoContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default Main;
