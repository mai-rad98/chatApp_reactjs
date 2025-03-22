import Navbar from "./components/Navbar"
import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage.jsx"
import SettinsPage from "./pages/SettinsPage.jsx"
import SignInPage from "./pages/SignInPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"


const App = () =>{
  return (
  <div>
  <Navbar/>

  <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/signup" element={<SignUpPage/>}/>
  <Route path="/login" element={<SignInPage/>}/>
  <Route path="/settings" element={<SettinsPage/>}/>
  <Route path="/profile" element={<ProfilePage/>}/>

  </Routes>
  </div>
  )
}
export default App