import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", {
        username,
        password,
        role, // send role too
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));

      // Redirect based on role
      if (res.data.role === "professor") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <label>Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Login as</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="professor">Professor</option>
        </select>

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
