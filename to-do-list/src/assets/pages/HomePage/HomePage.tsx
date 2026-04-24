import "./HomePage.css";
import { useEffect, useState } from "react";
import { Header } from "../Header";
import { Link } from "react-router";
import axios from "axios";

export function HomePage({ tasks, setTasks }: { tasks: any[]; setTasks: any }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [addTaskResult, setAddTaskResult] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function handleAdd() {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add-task`,
        { task_name: taskName, task_date: taskDate, task_details: taskDetails },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setAddTaskResult("Task Added!");
      setTaskName("");
      setTaskDate("");
      setTaskDetails("");
      setTimeout(() => {
        setAddTaskResult("");
      }, 5000);
    } catch {
      setAddTaskResult("API ERROR!");
    }
  }
  /* need to implement displaying the data
  async function handleDelete(id: string) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete-task`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { task_id: "id" },
      });
    } catch {
      console.log("ERROR");
    }
  }
    */

  const handleEdit = (id: number) => {
    const taskToEdit = tasks.find((task) => {
      return task.id === id;
    });
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDate(taskToEdit.date);
      setTaskDetails(taskToEdit.details);
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => {
      if (task.id !== id) {
        return true;
      } else {
        return false;
      }
    });
    setTasks(updatedTasks);
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <>
      <div className="body">
        <Header></Header>
        <title>Task List</title>
        <div className="background">
          <div className="overlay"></div>
        </div>

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
                <div className="toDoListRow" key={task.id}>
                  <div className="tableElement">
                    <Link to={`/task/${task.id}`}>{task.name}</Link>
                  </div>
                  <div className="tableElement">{task.date}</div>
                  <div className="tableElement">
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="tableElement">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="creating-new-task">
            <p className="new-task-title">Create New Task</p>
            <div className="inputRow">
              <input
                className="name-input"
                type="text"
                value={taskName}
                placeholder="Enter name of Task:"
                onChange={(event) => setTaskName(event.target.value)}
              />
              <input
                className="date-input"
                type="date"
                value={taskDate}
                placeholder="Enter date due:"
                onChange={(event) => setTaskDate(event.target.value)}
              />
              <button onClick={handleAdd} className="add-button">
                {editingId !== null ? "Save" : "Add"}
              </button>
              <button className="save-button button-hide">Save</button>
            </div>

            <div className="task-details-row">
              <textarea
                className="task-details-input"
                placeholder="Enter details for the task:"
                value={taskDetails}
                onChange={(event) => {
                  setTaskDetails(event.target.value);
                }}
              ></textarea>

              <div>
                <button className="attach-files">Attach Files</button>
              </div>
            </div>
            <div className="add-task-result">{addTaskResult}</div>
          </div>
        </div>
      </div>
    </>
  );
}
