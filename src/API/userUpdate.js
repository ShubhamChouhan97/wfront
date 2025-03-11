export const userUpdate = async (updateData) => {
    let email = localStorage.getItem("email");
    // console.log("dddddddd",updateData);

    if (!email) {
        return { success: false, data: { message: "Email not found!" } };
    }

    try {
        // Parse email if stored as JSON
        if (email.startsWith("{") && email.endsWith("}")) {
            email = JSON.parse(email).email;
        }

        const response = await fetch("http://localhost:3000/api/auth/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, ...updateData }), // Send email with updates
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, data: { message: "Something went wrong!" } };
    }
};
