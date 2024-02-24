import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    console.warn(email, password);
    let result = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.user));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result.auth) {
      navigate("/");
    } else {
      alert("Please enter correct detail");
    }
  };
  return (
    <div className="login ">
      <h1>Login</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        type="password"
        placeholder="Enter Password"
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
