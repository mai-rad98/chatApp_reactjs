import Navbar from "./components/Navbar"
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage.jsx"
import SettinsPage from "./pages/SettinsPage.jsx"
import SignInPage from "./pages/SignInPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import {Loader} from "lucide-react"

import {Toaster} from "react-hot-toast"

const App = () =>{

  const {authUser,checkAuth,isCheckingAuth,onlineUsers}= useAuthStore()
  useEffect(() =>{
    checkAuth()
  },[checkAuth])

  console.log(authUser,"I AM AUTH USER")
  console.log({onlineUsers});

  if(isCheckingAuth && !authUser){
    return(
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )

  }

  return (
  <div>
  <Navbar/>

  <Routes>
  <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
  <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
  <Route path="/login" element={!authUser ? <SignInPage/>: <Navigate to="/"/>}/>
  <Route path="/settings" element={<SettinsPage/>}/>
  <Route path="/profile" element={authUser  ? <ProfilePage/>: <Navigate to="/login"/>}/>

  </Routes>

  <Toaster/>
  </div>
  )
}
export default App