document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Reset lỗi
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    // Username
    if (username === "") {
        document.getElementById("usernameError").innerText = "Invalid username";
        isValid = false;
    }

    // Email
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email";
        isValid = false;
    }

    // Password
    if (!passwordRegex.test(password)) {
        document.getElementById("passwordError").innerText = "Invalid password";
        isValid = false;
    }

    // Phone
    if (!phoneRegex.test(phone)) {
        document.getElementById("phoneError").innerText = "Invalid phone number";
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
    }
});
