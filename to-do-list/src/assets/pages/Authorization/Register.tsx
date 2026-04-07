import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Register.css";

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister() {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        username: username,
        password: password,
      });
      setSuccessMessage("User Created!");
      setErrorMessage("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error!");
      setSuccessMessage("");
    }
  }
  return (
    <>
      <div className="background">
        <div className="overlay"></div>
      </div>
      <title>DM Register</title>
      <div>
        <div className="register-title">Sign Up</div>
        <div className="input-container">
          <input
            className="register-input-box"
            placeholder="login"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
          <input
            type="password"
            className="register-input-box"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          <div>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </div>
          <div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
          <div className="create-button-container">
            <button
              className="create-account-button"
              onClick={() => navigate("/login")}
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
