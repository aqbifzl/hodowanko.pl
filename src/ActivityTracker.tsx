import { ReactNode } from "react"
import { insertActivity } from "./requestHandle/activity"

interface Props{
  children: ReactNode
}

export const ActivityTracker = ({children}: Props) => {
  const referrer = document.referrer
  const sw = screen.width
  const sh = screen.height

  insertActivity({referrer, screenWidth: sw, screenHeight: sh}).then(() => console.log)

  return(
    <div>
      {children}
    </div>
  )
}
