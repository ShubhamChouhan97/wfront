import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Input from '../../component/Input';
import Button from '../../component/Button';
import Login from '../Login';
import { forgotpass } from '../../API/forgotpass';

function ForgotPass() {
  const [formData, setFormData] = useState({
    email: '',
    captchaAnswer: '', // Store the user's input for the captcha
  });
  const [login, setLogin] = useState(false);
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, sum: 0 });

  // Generate two random numbers and their sum when the page is refreshed
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    const sum = num1 + num2;
    setCaptcha({ num1, num2, sum });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (login) {
    return <Login />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if the entered captcha is correct
    if (parseInt(formData.captchaAnswer) !== captcha.sum) {
      setError('Wrong verification code. Please try again.');
      return;
    }

    // Continue with the reset logic (e.g., making an API call)
    const data=  forgotpass(formData.email);
    // Simulating reset process:
    console.log('Password reset triggered for', formData.email);
  };

  return (
    <div className={styles.main}>
      <div className={styles.center}>
        {error && <p className={styles.error}>{error}</p>}
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit} className={styles.iinp}>
          <div className={styles.inputbox}>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <span
            className={styles.signupText}
            onClick={() => setLogin(true)}
          >
            Login
          </span>

          <div className={styles.capcha}>
            <p>Verify Sum : {captcha.num1} + {captcha.num2} = ?</p>
            <div className={styles.inputcap}>
            <Input
              type="text"
              name="captchaAnswer"
              placeholder="Enter sum"
              value={formData.captchaAnswer}
              onChange={handleChange}
              required
            />
            </div>
            
          </div>

          <div className={styles.btn}>
            <Button type="submit">Reset</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
