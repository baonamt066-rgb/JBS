const form = document.getElementById("bookingForm");
const modal = new bootstrap.Modal(document.getElementById("confirmModal"));

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email";
        isValid = false;
    }

    if (!phoneRegex.test(phone)) {
        document.getElementById("phoneError").innerText = "Invalid phone number";
        isValid = false;
    }

    if (!date) {
        document.getElementById("dateError").innerText = "Invalid date";
        isValid = false;
    }

    if (!time) {
        document.getElementById("timeError").innerText = "Invalid time";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("confirmEmail").innerText = email;
        document.getElementById("confirmPhone").innerText = phone;
        document.getElementById("confirmDate").innerText = date;
        document.getElementById("confirmTime").innerText = time;

        modal.show();
    }
});
