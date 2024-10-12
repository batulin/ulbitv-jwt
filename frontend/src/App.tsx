import {Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UsersPage from "./components/UsersPage";


function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/users' element={<UsersPage/>}/>
    </Routes>
  )
}

export default App
