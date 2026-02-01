document.getElementById("submitBtn").addEventListener("click", function () {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    
    showData();
});

function showData() {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    document.getElementById("storedName").textContent = "Name: " + (name || "");
    document.getElementById("storedEmail").textContent = "Email: " + (email || "");
}

showData();
