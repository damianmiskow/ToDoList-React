import { useState } from "react";
import "./Login.css";
import axios from "axios";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  async function handleLogin() {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username: username,
        password: password,
      });

      setErrorMessage("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error!");
    }
  }
  return (
    <>
      <div className="background">
        <div className="overlay"></div>
      </div>
      <title>DM Login</title>
      <div>
        <div className="login-title">Login</div>
        <div className="input-container">
          <input
            className="login-input-box"
            placeholder="login"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
          <input
            type="password"
            className="login-input-box"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
          <div className="create-button-container"></div>
        </div>
      </div>
    </>
  );
}
