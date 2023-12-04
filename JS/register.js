const baseApiUrl = "https://api.noroff.dev/api/v1/auction/auth/register";

async function registerUser(url, data) {
    try {
        const registerUserData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, registerUserData);
        if (response.ok) {
            const responseData = await response.json();
            console.log("Registration successful:", responseData);

        } else {
            const errorData = await response.json();
            console.log("Registration failed:", errorData);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

const registerForm = document.getElementById("reg-form");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const avatar = document.getElementById("reg-avatar").value;

    const userData = {
        name,
        email,
        password,
        avatar,
    };

    await registerUser(baseApiUrl, userData); 
});
