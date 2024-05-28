import { useMemo } from "react";
import { getRandomInt } from "../../utils/utilsFunctions";
import { allTextColors } from "../../utils/utilsVariables";

interface MouseCoordinates{
  pageX: number
  pageY :number
  btnRef: React.RefObject<HTMLDivElement>
}

const getRandomMoveProperty = () => {
  return getRandomInt(
    50, 200
  ) * (getRandomInt(
    0, 1
  ) ? 1 : -1)
}

export const Wow = ({
  btnRef,pageX, pageY 
}: MouseCoordinates) => {
  if(!btnRef.current)
    throw Error("Couldn't get button infomration") 
  let {
    left, top 
  } = btnRef.current.getBoundingClientRect()
  top += window.scrollY
  left += window.scrollX

  const leftMove = useMemo(
    () => getRandomMoveProperty(), [
    ]
  );
  const topMove = useMemo(
    () => getRandomMoveProperty(), [
    ]
  );

  if(!pageX){
    pageX = btnRef.current.offsetLeft + (btnRef.current.clientWidth/2)
  }
  if(!pageY){
    pageY = btnRef.current.offsetTop + (btnRef.current.clientHeight/2)
  }

  const initialLeft = pageX-left
  const initialTop = pageY-top-40

  const destinationLeft =initialLeft+leftMove 
  const destinationTop =initialTop+topMove 

  const animationStyle = {
    animation: "wowAnim 0.55s cubic-bezier(0.55, 0, 1, 0.45)",
    "--from-top": `${initialTop}px`,
    "--from-left": `${initialLeft}px`,
    "--to-top": `${destinationTop}px`,
    "--to-left": `${destinationLeft}px`,
  };

  const randomColor = useMemo(
    () => allTextColors[getRandomInt(
      0, allTextColors.length - 1
    )],[
    ]
  );

  return (
    <div
      className={`opacity-0 select-none absolute font-bold
      text-${randomColor} text-[40px] text-shadow-textpop`}
      style={animationStyle}
    >
      Wow
    </div>
  );
};
