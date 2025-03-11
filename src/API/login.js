export const loginUser = async (formData) => {
    try {
        const response = await fetch("https://wback-mpbz.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include", // ✅ Allows cookies to be sent and received
        });

        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error("Error:", error);
        return { success: false, data: { message: "Something went wrong!" } };
    }
};
