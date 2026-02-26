
import "./HomePage.css"; 
import { todoList as initialData } from "../../data/tasks";
import { useState } from "react";
import { Header } from "./Header";

export function HomePage() {

  const[tasks, setTasks] = useState(initialData)
  const[taskName, setTaskName] = useState("")
  const[taskDate, setTaskDate] = useState("")

  const handleAdd = () => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      date: taskDate,
      details: ""
    }

    setTasks([...tasks, newTask])
  }

  return (
    <>
      <title>Task List</title>
      <div className="background">
        <div className="overlay"></div>
      </div>

    <Header></Header>

      <div className="entireTable">
        <div className="titleRow">
          <div className="tableElement">Name</div>
          <div className="tableElement">Date</div>
          <div className="tableElement">Delete</div>
          <div className="tableElement">Edit</div>
        </div>



        <div className="toDoList">
          {tasks.map((task) => (
            <>
            <div className = "toDoListRow" key = {task.id}>
        <div className  = "tableElement">
            <a href ="task-details.html?id=${task.id}">{task.name}</a>
        </div>
        <div className  = "tableElement">{task.date}</div>
        <div className  = "tableElement">
            <button className  = "delete-button" data-task-id={task.id}>Delete</button>
        </div>
        <div className  = "tableElement">
            <button className = "edit-button" data-task-id={task.id}>Edit</button>
        </div>
        </div>
        </>
          ))}
        </div>

        <p className="new-task-title">Create New Task</p>

        <div className="inputRow">
          <input
            className="name-input"
            type="text"
            placeholder="Enter name of Task:"
            onChange={(event) => setTaskName(event.target.value)}
          />
          <input
            className="date-input"
            type="date"
            placeholder="Enter date due:"
            onChange={(event)=> setTaskDate(event.target.value)}
          />
          <button onClick = {handleAdd} className="add-button">Add</button>
          <button className="save-button button-hide">
            Save
          </button>
        </div>

        <div className="task-details-row">
          <textarea
            className="task-details-input"
            placeholder="Enter details for the task:"
          ></textarea>

          <div>
            <button className="attach-files">Attach Files</button>
          </div>
        </div>
      </div>
    </>
  );
}