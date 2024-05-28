import { useEffect, useState } from "react"
import { type z } from "zod"
import { type gameMode } from "../contexts/GameInfoContext"
import { getTopUsers } from "../requestHandle/leaderboard"
import { type leaderboardScores } from "../zod/response"

interface PopupProps{
  amount?: number
  mode: gameMode
}

export const Leaderboard = ({
  amount=10, mode 
} : PopupProps) => {
  const [
    topUsers, setTopUsers
  ] = useState<undefined | z.infer<typeof leaderboardScores>>(undefined)
  const [
    errorMsg, setErrorMsg
  ] = useState<undefined | string>(undefined)

  const getData = async () => {
    const users = await getTopUsers(
      mode, amount
    )
    setTopUsers(users)
    if(!users.length)
      setErrorMsg("Nic tu nie ma")
  }

  useEffect(
    () => {
      getData()
        .catch(_ => {setErrorMsg("Błąd podczas pobierania informacji")})
    },[
    ]
  )

  return(
    <div className="flex items-center flex-col">
      <span className="leading-none text-3xl font-bold">
Ranking top
        {amount}
:
      </span>
      {topUsers?.length && !errorMsg ? (
        <table className="text-sm border-0 mt-2 border-spacing-5 border-collapse">
          <thead>
            <tr className="text-white font-bold">
              {[
                "Miejsce","Piesełów","Gracz","Data"
              ].map(name => (
                <th className="p-2">
                  <div className="bg-click-btn px-1 rounded w-full">{name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topUsers.map((
              item,i
            ) => (
              <tr>
                <td><span>{i+1}</span></td>
                <td>{item.points}</td>
                <td>{item.username}</td>
                <td>{item.createdAt.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
        : <div className="bg-click-btn px-1 rounded p-2 text-white m-5">{errorMsg}</div>
      }
    </div>
  )
}
