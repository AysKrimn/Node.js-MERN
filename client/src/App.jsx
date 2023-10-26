import { Route, Routes } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './Components/Nav.jsx'

// SAYFALARIMIZ
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Test from './Pages/Test'
import Register from './Pages/Register'
import TweetDetail from './Pages/TweetDetail'
import UserProfile from './Pages/UserProfile'


// layouts
import LoadData from './Layouts/LoadData'
import Main_Layout from './Layouts/Main_Layout'




function App() {

  return (
    <>
      {/* ROUTING */}
      <Navbar></Navbar>
      
      <Routes>

            <Route element={<LoadData></LoadData>}>


                    {/* ana yapı */}
                    <Route element={<Main_Layout></Main_Layout>}>

                        <Route path='/' element={<HomePage></HomePage>}></Route>
                        <Route path='/tweets/:tweetId' element={<TweetDetail></TweetDetail>}></Route>
                        <Route path='/test' element={<Test></Test>}></Route>
                        <Route path='/users/:userName' element={<UserProfile></UserProfile>}></Route>

                    </Route>
                 
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='/register' element={<Register></Register>}></Route>

            </Route>


      </Routes>

    </>
  )
}

export default App
