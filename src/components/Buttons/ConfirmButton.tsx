interface Props{
  name: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ConfirmButton = ({
  name,onClick 
} : Props) => {
  return(
    <>
      <button onClick={(e) => onClick(e)}
        className="max-w-[80px] border-0 cursor-pointer
        rounded outline-none text-white bg-[#82ce25] py-1 px-2.5 text-sm">
        {name}
      </button>
    </>
  )
}
