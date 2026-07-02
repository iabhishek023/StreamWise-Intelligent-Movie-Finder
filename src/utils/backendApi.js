const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8081" || "https://streamwise-backend.onrender.com";

const getToken = () => localStorage.getItem("streamwise_token");

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem("streamwise_token", data.data.token);
        }
        return data;
    } catch (err) {
        console.warn("Backend register failed:", err);
        return { success: false };
    }
};

export const loginUser = async (email, password) => {
    try {
        // console.log("1. Calling backend URL:", BACKEND_URL);

        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        // console.log("2. Login status:", response.status);
        const data = await response.json();
        // console.log("3. Login data:", JSON.stringify(data));

        if (data.success) {
            localStorage.setItem("streamwise_token", data.data.token);
            // console.log("4. Token stored successfully");
            return data;
        }

        // console.log("5. Login failed, trying register...");
        const registerResponse = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: email.split("@")[0],
                email,
                password,
            }),
        });

        // console.log("6. Register status:", registerResponse.status);
        const registerData = await registerResponse.json();
        // console.log("7. Register data:", JSON.stringify(registerData));

        if (registerData.success) {
            localStorage.setItem("streamwise_token", registerData.data.token);
            console.log("8. Token stored after register");
        }
        return registerData;

    } catch (err) {
        console.error("9. Backend error:", err.message);
        return { success: false };
    }
};

export const searchMovies = async (query) => {
    try {
        const token = getToken();
        console.log("TOKEN AT SEARCH TIME:", token);

        if (!token) {
            throw new Error("No JWT token found. Please sign in again.");
        }

        const response = await fetch(`${BACKEND_URL}/api/movies/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
        });

        if (response.status === 403 || response.status === 401) {
            // Token expired — clear it
            localStorage.removeItem("streamwise_token");
            throw new Error("Session expired. Please sign in again.");
        }

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();
        
        // data.data is the recommendations string from ApiResponse wrapper
        const content = data.data;

        // Parse if string, return directly if already array
        if (typeof content === "string") {
            return JSON.parse(content.replace(/```json|```/g, "").trim());
        }
        return content;

    } catch (err) {
        console.error("searchMovies error:", err);
        throw err;
    }
};

export const getSearchHistory = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/movies/history`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        return data.data;
    } catch (err) {
        console.warn("getSearchHistory failed:", err);
        return [];
    }
};

export const deleteSearchHistory = async (id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/movies/history/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        return await response.json();
    } catch (err) {
        console.warn("deleteSearchHistory failed:", err);
        return { success: false };
    }
};