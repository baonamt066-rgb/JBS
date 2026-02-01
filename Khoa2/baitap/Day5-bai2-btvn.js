// Khi nhấn Lưu → ghi vào localStorage
document.getElementById("saveBtn").addEventListener("click", function () {
    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        avatar: document.getElementById("avatar").value
    };

    localStorage.setItem("profile", JSON.stringify(user));

    showProfile();
});


// Hàm hiển thị thông tin ra khung bên phải
function showProfile() {
    const data = JSON.parse(localStorage.getItem("profile"));

    if (!data) return;

    document.getElementById("profileImage").src = data.avatar || "";
    document.getElementById("profileName").textContent = "Họ tên: " + data.name;
    document.getElementById("profileEmail").textContent = "Email: " + data.email;
    document.getElementById("profilePhone").textContent = "SĐT: " + data.phone;
    document.getElementById("profileAddress").textContent = "Địa chỉ: " + data.address;

    // Đồng thời đổ dữ liệu lại vào form để người dùng có thể chỉnh sửa
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("address").value = data.address;
    document.getElementById("avatar").value = data.avatar;
}

// Khi mở trang → tự load thông tin nếu có
showProfile();
