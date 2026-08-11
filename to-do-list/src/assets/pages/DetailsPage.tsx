import { Header } from "./Header";
import { useParams } from "react-router";
import type { Task } from "../../data/tasks";
import "./DetailsPage.css";

interface DetialsPageProps {
  tasks: Task[];
}

export function DetailsPage({ tasks }: DetialsPageProps) {
  const { id } = useParams();

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return (
      <>
        <title>Error</title>
        <div>Task not found!</div>
      </>
    );
  }
  return (
    <>
      <div className="body">
        <title>{task.name}</title>
        <div className="background">
          <div className="overlay"></div>
        </div>
        <Header></Header>
        <div className="task-details-title">Task Details:</div>
        <div className="task-details-text">{task.details}</div>
      </div>
    </>
  );
}
