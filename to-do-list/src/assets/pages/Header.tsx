import "./Header.css"
import {NavLink} from "react-router"

export function Header() {
    return (
        <div className="header">
        <div className="page-title">Task List</div>
        <div className="right-section">
            <NavLink to="/" className="js-home-page">Home</NavLink>
        </div>
      </div>
    )
}