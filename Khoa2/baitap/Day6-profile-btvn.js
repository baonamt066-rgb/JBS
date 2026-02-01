const user = JSON.parse(localStorage.getItem("currentUser"));

name.value = user.username;
email.value = user.email;

function saveProfile() {
  user.username = name.value;
  user.email = email.value;
  user.password = password.value || user.password;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("currentUser", JSON.stringify(user));
  alert("Cập nhật thành công");
}
