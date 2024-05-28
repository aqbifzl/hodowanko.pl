import { type ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

export const Popup = ({
  children,className 
}: Props) => {
  return(
    <div 
      className={`absolute w-full h-full ${className} top-0 flex items-center justify-center`}>
      <div 
        className="w-4/5 shadow-original rounded bg-white
      p-5 bg-center bg-no-repeat bg-[url(/public/piesel-head.png)]">
        {children}
      </div>
    </div>
  )
}

export default Popup
