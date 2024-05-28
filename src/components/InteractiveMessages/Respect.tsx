import { useMemo } from "react";
import { getRandomInt } from "../../utils/utilsFunctions";
import { allTextColors } from "../../utils/utilsVariables";

export const Respect = () => {
  const animationStyle = { animation: "respectAnim 1s cubic-bezier(0.85, 0, 0.15, 1)" };
  const randomColor = useMemo(
    () => allTextColors[getRandomInt(
      0, allTextColors.length - 1
    )], [
    ]
  );

  return (
    <div
      className={`opacity-0 absolute select-none text-${randomColor}
      top-[270px] left-[45px] text-3xl text-shadow-textpop`}
      style={animationStyle}
    >
      Uszanowanko
    </div>
  );
};
