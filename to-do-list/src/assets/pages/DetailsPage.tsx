import { Header } from "./Header"
import { useParams } from "react-router"
import type {Task} from "../../data/tasks";

interface DetialsPageProps {
    tasks: Task[]
}

export function DetailsPage({tasks}: DetialsPageProps) {
    const {id} = useParams()

    const task = tasks.find((task)=> task.id === Number(id))

    if (!task) {
        return (
            <>
            <title>Error</title>
            <div>Task not found!</div>
            </>
        )
    }
    return (
        <>
        <title>{task.name}</title>
        <Header></Header>
        <div>{task.details}</div>
        </>
    )
}