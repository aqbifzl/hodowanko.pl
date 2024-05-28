import { type gameMode } from "../../contexts/GameInfoContext"

interface Props{
  name?: string
  mode: gameMode
  setLeaderboard: React.Dispatch<React.SetStateAction<boolean>>
  setLeaderboardMode: React.Dispatch<React.SetStateAction<gameMode>>
}

export const RankingButton = ({
  name="Zobacz ranking",mode, setLeaderboard, setLeaderboardMode 
}: Props) => {
  const handleClick = () => {
    setLeaderboardMode(mode)
    setLeaderboard(true)
  }

  return(
    <span className="text-[#5d5c5c] text-xs opacity-100 cursor-pointer underline"
      onClick={() => handleClick()}>
      {name}
    </span>
  )
}
