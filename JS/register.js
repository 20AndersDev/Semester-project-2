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
        window.location.href = "/login/index.html";
    } catch (error) {
        return error;
    }
}

const registerForm = document.getElementById("reg-form");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const avatar = document.getElementById("reg-avatar").value;

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
        errorMessage.textContent = "";
    });

    if (name.trim() === "") {
        document.getElementById("register-error-name").textContent = "Name is required.";
        return;
    }
    if (!/^[A-Za-z0-9_]+$/.test(name)) {
        document.getElementById("register-error-name").textContent = "Name must not contain punctuation symbols apart from underscore (_).";
        return;
    }

    if (email.trim() === "") {
        document.getElementById("register-error-email").textContent = "Email is required.";
        return;
    }
    if (!/^[\w\.-]+@(stud\.)?noroff\.no$/.test(email)) {
        document.getElementById("register-error-email").textContent = "Email must be a valid stud.noroff.no or noroff.no email address.";
        return;
    }


    if (password.trim() === "") {
        document.getElementById("register-error-password").textContent = "Password is required.";
        return;
    }
    if (password.length < 8) {
        document.getElementById("register-error-password").textContent = "Password must be at least 8 characters.";

    }


    const userData = {
        name,
        email,
        password,
        avatar,
    };

    await registerUser(baseApiUrl, userData);
});