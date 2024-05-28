import Popup from "../Popup"

export const NotFoundError = () => {
  return(
    <div>
      <Popup> 
        <p className="text-center text-xl">Nie ma takiej strony!!!! 404</p>
      </Popup>
    </div>
  )
}

export default NotFoundError
