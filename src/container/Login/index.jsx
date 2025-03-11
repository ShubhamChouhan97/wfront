import React, { useState } from "react";
import styles from "./style.module.css";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { loginUser } from "../../API/login"; // Import the login API function
import SignUp from "../SignUp"; // Import SignUp for switching
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await loginUser(formData);
      if (result.success) {
        console.log(result);
        let a = result.data;
        let detail = a.user;
        let id = detail._id;

        localStorage.setItem("email", JSON.stringify({email: detail.email}));
        localStorage.setItem("userId",id);
        localStorage.setItem("token", a.token); // Store token
        onLogin(a.token); // Notify App.js about login
            socket.emit("online", { id });
         
      } else {
        setError(result.data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (showSignup) {
    return <SignUp />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.center}>
        <div className={styles.heading}>
          <h2>Login</h2>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.iinp}>
          <div className={styles.inputbox}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputbox}>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.btn}>
            <Button type="submit">Login</Button>
          </div>
        </form>
        <div className={styles.botm}>
          <p>
            Don't have an account?{" "}
            <span
              className={styles.signupText}
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
