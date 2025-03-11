// Client-side: Function to handle account deletion
export const DeleteAccount = async () => {
    const MyId = localStorage.getItem("userId"); // Getting the user ID from localStorage
    console.log("My ID:", MyId);
  
    // If there is no user ID in localStorage, show an error and return
    if (!MyId) {
      alert("User ID not found in localStorage");
      return;
    }
  
    try {
      // Making the API request to delete the account
      const response = await fetch('http://localhost:3000/api/auth/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: MyId }) // Sending the user ID to the server
      });
  
      // Handling the response from the server
      const data = await response.json();
      if (response.ok) {
        alert("Account deleted successfully");
        localStorage.clear();
        sessionStorage.clear();
      } else {
        alert(data.message || "Failed to delete account");
      }
      return data;
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting the account.");
    }
  };
  