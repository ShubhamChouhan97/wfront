// src/api/logout.js
export const logoutUser = async () => {
  let email = localStorage.getItem("email");
    
  // Handle possible email format in localStorage
  if (email && email.startsWith("{") && email.endsWith("}")) {
    try {
      email = JSON.parse(email).email;
    } catch (error) {
      console.error("Error parsing email from localStorage:", error);
      return { success: false, data: { message: "Invalid email format." } };
    }
  }

  // Ensure email is available
  if (!email) {
    return { success: false, data: { message: "No email found in localStorage." } };
  }
  
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensures cookies are included in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user:email}),
      });
  
      if (response.ok) {
        alert("Logout Succefully");
        // Clear all cookies
        document.cookie.split(";").forEach((cookie) => {
          document.cookie = cookie
            .replace(/^ +/, "") // Remove spaces
            .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"); // Expire cookies
        });
  
        // Clear localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();
       
        // Redirect to login page
        // window.location.href = '/login';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  