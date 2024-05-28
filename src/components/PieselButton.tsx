import React, {
  useContext, useRef, useState 
} from "react";
import { GameInfoContext, modeTimeLeft } from "../contexts/GameInfoContext";
import { clickButtonPressIntervalMs, defaultContextVal } from "../utils/utilsVariables";
import { Respect } from "./InteractiveMessages/Respect";
import { Wow } from "./InteractiveMessages/Wow";

export const PieselButton = () => {
  const [
    isClicked, setIsClicked
  ] = useState<boolean>(false);
  const gInfoContext = useContext(GameInfoContext);
  const pieselButtonRef = useRef<HTMLDivElement>(null)
  if (!gInfoContext) {
    throw new Error("Can't use game info context");
  }
  const {
    gameInfo, setGameInfo 
  } = gInfoContext;
  const {
    ran, respectQueue, wowQueue 
  } = gameInfo

  const checkIfRan = () => {
    if(gameInfo.ran)
      return

    setGameInfo((prevGameInfo) => ({
      ...defaultContextVal,
      mode: prevGameInfo.mode,
      ran: true,
      timeLeft: modeTimeLeft[prevGameInfo.mode]
    }));
  };

  const handlePieselClick = async (e: React.MouseEvent) => {
    checkIfRan();
    setIsClicked(true);
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      wowQueue: [
        ...prevGameInfo.wowQueue, {
          id: prevGameInfo.wowQueue.length,
          pageX: e.pageX,
          pageY: e.pageY 
        }
      ],
      balance: prevGameInfo.balance+prevGameInfo.rewardPerClick
    }));

    setTimeout(
      () => {
        setIsClicked(false);
      },clickButtonPressIntervalMs
    )
  };

  return (
    <div ref={pieselButtonRef}
      className="h-[300px] overflow-hidden w-[300px] select-none
      cursor-pointer bg-no-repeat bg-cover bg-center relative bg-[url(/public/piesel.png)]"
      onClick={(e) => handlePieselClick(e)}
      style={{ backgroundSize: isClicked ? "98%" : "100%" }}>
      {respectQueue.map(() =>  <Respect/>)}
      {wowQueue.map(wow =>  (
        <Wow btnRef={pieselButtonRef}
          pageX={wow.pageX}
          pageY={wow.pageY}/>
      ))}
      <div 
        className={`${ran ? "hidden" : "flex"}
        items-center justify-center h-full w-full bg-white opacity-70`}>
        <span className="font-bold">Kliknij aby rozpocząć</span>
      </div>
    </div>
  );
};
