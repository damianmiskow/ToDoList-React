import "./HomePage.css";
import { useEffect, useState } from "react";
import { Header } from "../Header";
import { Link } from "react-router";
import axios from "axios";

export function HomePage({ tasks, setTasks }: { tasks: any[]; setTasks: any }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [notification, setNotification] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  /* handling adding tasks */
  async function handleAdd() {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/add-task`,
        { task_name: taskName, task_date: taskDate, task_details: taskDetails },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchTasks();
      setNotification("Task Added!");
      setTaskName("");
      setTaskDate("");
      setTaskDetails("");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch {
      setNotification("API ERROR!");
    }
  }

  /* handing displaying tasks */

  async function fetchTasks() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const apiTasks = response.data.map((task: any) => ({
        id: task["task-id"],
        name: task["task-name"],
        date: task["task-date"],
        details: task["task-details"],
      }));
      setTasks(apiTasks);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    setTasks((currentTasks: any[]) =>
      currentTasks.filter((task) => task.id !== id),
    );
    try {
      const token = localStorage.getItem("token") || "";

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-task`,

        {
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "application/json",
          },

          data: JSON.stringify({ task_id: id }),
        },
      );

      setNotification("Task Deleted!");
      await fetchTasks();
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch {
      console.log("ERROR");
    }
  }

  const handleEdit = (id: string) => {
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
  /* old delete function
  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter((task) => {
      if (task.id !== id) {
        return true;
      } else {
        return false;
      }
    });
    setTasks(updatedTasks);
  };
*/
  useEffect(() => {
    fetchTasks();
  }, []);

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
            <div className="notification">{notification}</div>
          </div>
        </div>
      </div>
    </>
  );
}
