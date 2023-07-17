import { Courses } from './pages/Courses/Courses'
import { Homepage } from './pages/Homepage/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
      <Route path='/courses' element={<Courses/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
