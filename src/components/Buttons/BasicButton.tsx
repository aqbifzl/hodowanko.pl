interface Props{
  name: string
  onClick?: () => void
}

export const BasicButton = ({
  name,onClick 
}: Props) => {
  return(
    <a onClick={onClick}
      className="rounded text-center mx-1 mt-[20px] px-[15px]
      py-[5px] bg-savebg text-white hover:text-white cursor-pointer inline-block select-none">
      {name}
    </a>
  )
}
