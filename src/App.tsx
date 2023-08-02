import { Courses } from './pages/Courses/Courses'
import { Homepage } from './pages/Homepage/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from './pages/Signup/Signup'
import { Navbar } from './components/Navbar/Navbar'
import { Signin } from './pages/SignIn/Signin'
import { Favourites } from './pages/Favorites/Favorites'
function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/favs' element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
