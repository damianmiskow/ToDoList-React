import './App.css'
import { Routes, Route } from "react-router"
import { HomePage } from './assets/pages/HomePage/HomePage'
import { DetailsPage } from './assets/pages/DetailsPage'

function App() {

  return (
    <Routes>
      <Route path = "/" element = {<HomePage/>}></Route>
      <Route path = "/details" element = {<DetailsPage/>}></Route>

    </Routes>
  )
}

export default App
