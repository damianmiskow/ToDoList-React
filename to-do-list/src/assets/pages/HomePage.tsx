
import "./HomePage.css"; 

export function HomePage() {
  return (
    <>
      <div className="background">
        <div className="overlay"></div>
      </div>

      <div className="header">
        <div className="page-title">Task List</div>
        <div className="right-section">
          <button className="js-home-page">Home Page</button>
        </div>
      </div>

      <div className="entireTable">
        <div className="titleRow">
          <div className="tableElement">Name</div>
          <div className="tableElement">Date</div>
          <div className="tableElement">Delete</div>
          <div className="tableElement">Edit</div>
        </div>

        <div className="toDoList">
          <div className="toDoListRow"></div>
        </div>

        <p className="new-task-title">Create New Task</p>

        <div className="inputRow">
          <input
            className="js-name-input name-input"
            type="text"
            placeholder="Enter name of Task:"
          />
          <input
            className="js-date-input date-input"
            type="date"
            placeholder="Enter date due:"
          />
          <button className="js-taskAddButton add-button">Add</button>
          <button className="js-saveButton save-button button-hide">
            Save
          </button>
        </div>

        <div className="task-details-row">
          <textarea
            className="task-details-input js-task-details-input"
            placeholder="Enter details for the task:"
          ></textarea>

          <div>
            <button className="attach-files js-attach-files">Attach Files</button>
            <input type="file" className="js-file-input" multiple hidden />
          </div>
        </div>
      </div>
    </>
  );
}