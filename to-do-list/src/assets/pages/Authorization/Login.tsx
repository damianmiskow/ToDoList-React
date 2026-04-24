import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  async function handleLogin() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          username: username,
          password: password,
        },
      );

      const parsedBody = JSON.parse(response.data.body);
      if (parsedBody.token) {
        localStorage.setItem("token", parsedBody.token);
        setErrorMessage("");
        setUsername("");
        setPassword("");
        navigate("/home");
      } else {
        setErrorMessage("Invalid Credentials!");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid Credentials!!");
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
