import { type ReactNode } from "react"

interface Props{
  children: ReactNode
  name: string
}

export const GroupOfButtons = ({
  children,name 
}: Props) =>(
  <div className="w-1/2 md:w-full">
    <div className="mb-[10px] font-bold text-xl text-center md:text-left">{name}</div>
    <ul className="m-0 p-0 list-none select-none">
      {children}
    </ul>
  </div>
)
