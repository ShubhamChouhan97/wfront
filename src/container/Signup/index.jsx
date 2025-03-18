import React, { useState } from "react";
import styles from "./style.module.css";
import Input from "../../component/Input";
import Button from "../../component/Button";
import Login from "../Login";
import { signupUser } from "../../API/signup"; // Import the API function

function SignUp() {
  const [showSignin, setShowSignin] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signupUser(formData);

    if (result.success) {
      alert("User registered successfully!");
      setShowSignin(true);
    } else {
      alert(result.data.message || "Registration failed");
    }
  };

  if (showSignin) {
    return <Login />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.center}>
        <div className={styles.heading}>
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.iinp}>
          <div className={styles.inputbox}>
            <Input
              type="text"
              name="userName"
              placeholder="Full Name"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputbox}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputbox}>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.btn}>
            <Button type="submit">Register</Button>
          </div>
        </form>
        <div className={styles.botm}>
          <p>
            Already have an account?{" "}
            <span
              className={styles.signinText}
              onClick={() => setShowSignin(true)}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
