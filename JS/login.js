import { loginUrl  } from "/JS/api.js";

async function loginUser(url, data) {
    try{
        const loginUserData = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, loginUserData);
        console.log(response);

        if (response.ok) {
            const responseData = await response.json();
            console.log("Login successful:", responseData);
            localStorage.setItem("token", responseData.accessToken);
            localStorage.setItem("credits", responseData.credits);
            localStorage.setItem("name", responseData.name);
            localStorage.setItem("avatar", responseData.avatar);
            localStorage.setItem("defaultavatar", 'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg');
            window.location.href = "../index.html";

        } else if (response.ok === false) {
            // Login failed, display error message
            const errorData = await response.json();
            console.log("Login failed:", errorData);
            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error-message","text-center");
            errorMessage.textContent = "Login failed: please check your email and password.";
            document.getElementById("login-error").appendChild(errorMessage);
        }
    } catch (error) {
        console.log("Error:", error);
    }

}

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const userData = {
        email,
        password,
    };

    await loginUser(loginUrl, userData);
});