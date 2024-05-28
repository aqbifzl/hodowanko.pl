import { Route, Routes } from "react-router-dom";
import NotFoundError from "./components/Errors/NotFoundError";
import Main from "./Main";
import { restoreUrl } from "./utils/utilsVariables";

export const App = () => {
  return(
    <Routes>
      <Route path={`${restoreUrl}:restoreId`}
        element={<Main/>} />
      <Route path="/"
        element={<Main/>} />
      <Route path="*"
        element={<NotFoundError/>} />
    </Routes> 
  )
}

export default App;
