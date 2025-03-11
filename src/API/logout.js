// src/api/logout.js
export const logoutUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensures cookies are included in the request
        headers: {
          'Content-Type': 'application/json',
        },
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
  