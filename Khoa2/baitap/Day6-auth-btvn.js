function showRegister() {
  loginBox.classList.add("hidden");
  registerBox.classList.remove("hidden");
}

function showLogin() {
  registerBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  // REGISTER
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const user = {
        username: username.value,
        email: email.value,
        password: password.value
      };

      localStorage.setItem("user", JSON.stringify(user));
      alert("Đăng ký thành công!");
      showLogin();
    });
  }

  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (
        savedUser &&
        loginUsername.value === savedUser.username &&
        loginPassword.value === savedUser.password
      ) {
        window.location.href = "Day6-home-btvn.html";
      } else {
        alert("Sai thông tin đăng nhập");
      }
    });
  }
});
