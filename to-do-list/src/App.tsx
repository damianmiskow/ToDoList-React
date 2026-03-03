import './App.css'
import { Routes, Route } from "react-router"
import { HomePage } from './assets/pages/HomePage/HomePage'
import { DetailsPage } from './assets/pages/DetailsPage'
import { todoList as initialData } from './data/tasks'
import { useState } from 'react'

function App() {
  
  const[tasks, setTasks] = useState(initialData);

  return (
    <Routes>
      <Route path = "/" element = {<HomePage tasks = {tasks} setTasks = {setTasks} />} ></Route>
      <Route path = "/task/:id" element = {<DetailsPage tasks = {tasks}/>}></Route>

    </Routes>
  )
}

export default App
