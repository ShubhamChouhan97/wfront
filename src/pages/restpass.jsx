// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ResetPassword = () => {
//   const { token } = useParams(); // Extract token from URL params
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isValidToken, setIsValidToken] = useState(false);

 
//   // useEffect(() => {
//   //   console.log("Verifying token:", token); // Add this line to check the token value
  
//   //   // Pass the token as a query parameter in the URL
//   //   axios
//   //     .get(`http://localhost:3000/api/auth/verifyresettoken?token=${token}`)
//   //     .then((res) => setIsValidToken(true))
//   //     .catch((err) => {
//   //       console.error("Error verifying token:", err);
//   //       setError("Invalid or expired reset token.");
//   //     });
//   // }, [token]);
  
  
//   useEffect(() => {
//     if (!token) return;  // Prevent API call if token is not set

//     console.log("Verifying token:", token);  // Debugging the token

//     // Pass the token as a query parameter in the URL
//     axios
//       .get(`http://localhost:3000/api/auth/verifyresettoken?token=${token}`)
//       .then((res) => {
//         // Token verification was successful
//         console.log('Token verified:', res.data.message);
//         setIsValidToken(true);
//         setError(''); // Clear any previous error messages
//       })
//       .catch((err) => {
//         // Handle errors (expired or invalid token)
//         console.error("Error verifying token:", err.response ? err.response.data : err);
//         setIsValidToken(false);
//         setError(err.response ? err.response.data.message : 'An error occurred.');
//       });
//   }, [token]);  // Only run this when the token changes

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:5173/api/auth/reset-password`, {
//         token,
//         password,
//       });
//       alert("Password reset successfully! Redirecting to login...");
//       navigate("/login");
//     } catch (error) {
//       setError(error.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (error) return <p className="error">{error}</p>;
//   if (!isValidToken) return <p>Verifying token...</p>;

//   return (
//     <div>
//       <h2>Reset Your Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//       {error && <p className="error">{error}</p>}

      
//     </div>
//   );
// };

// export default ResetPassword;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (!token) return;

    console.log("Verifying token:", token);

    axios
      .get(`http://localhost:3000/api/auth/verifyresettoken?token=${token}`)
      .then((res) => {
        setIsValidToken(true);
        setError('');
      })
      .catch((err) => {
        setIsValidToken(false);
        setError(err.response ? err.response.data.message : 'Invalid or expired reset token.');
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/auth/resetpassword`, {
        token,
        password,
      });
      alert("Password reset successfully! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.centeredContainer}>
        <h2 style={styles.heading}>Reset Your Password</h2>
        {error && <p style={styles.error}>{error}</p>}
        {!isValidToken && <p style={styles.info}>Verifying token...</p>}
        
        {isValidToken && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fffff",
    padding: "20px",
  },
  centeredContainer: {
    backgroundColor: "#eeeeee",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width:"95%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#26d367",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  info: {
    color: "#666",
    fontSize: "14px",
  },
};

export default ResetPassword;
