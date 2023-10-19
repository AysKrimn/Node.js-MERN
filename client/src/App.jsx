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



// layouts
import LoadData from './Layouts/LoadData'




function App() {

  return (
    <>
      {/* ROUTING */}
      <Navbar></Navbar>
      
      <Routes>

            <Route element={<LoadData></LoadData>}>


                    <Route path='/' element={<HomePage></HomePage>}></Route>
                    <Route path='/tweets/:tweetId' element={<TweetDetail></TweetDetail>}></Route>
                    <Route path='/test' element={<Test></Test>}></Route>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='/register' element={<Register></Register>}></Route>

            </Route>


      </Routes>

    </>
  )
}

export default App
