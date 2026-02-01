document.addEventListener("DOMContentLoaded", () => {  // Sự kiện chờ tài liệu tải xong trước khi thực thi code, đảm bảo các phần tử HTML đã sẵn sàng
    // Hàm helper để lấy và xử lý users từ localStorage
    function getUsers() {  // Hàm này dùng để đọc dữ liệu users từ localStorage
        try {  // Sử dụng try-catch để xử lý lỗi khi parse JSON
            return JSON.parse(localStorage.getItem("users")) || [];  // Trả về mảng users nếu tồn tại, nếu không thì trả về mảng rỗng
        } catch (error) {  // Nếu có lỗi (ví dụ: dữ liệu không phải JSON)
            console.error("Lỗi khi đọc localStorage:", error);  // Ghi log lỗi để debug
            return [];  // Trả về mảng rỗng để tránh crash
        }
    }

    function saveUsers(users) {  // Hàm này dùng để lưu mảng users vào localStorage
        try {  // Sử dụng try-catch để xử lý lỗi khi lưu dữ liệu
            localStorage.setItem("users", JSON.stringify(users));  // Chuyển mảng users thành chuỗi JSON và lưu
        } catch (error) {  // Nếu có lỗi (ví dụ: localStorage đầy)
            console.error("Lỗi khi lưu localStorage:", error);  // Ghi log lỗi
        }
    }

    // Xử lý form đăng ký (Register)
    const registerForm = document.getElementById("register-form");  // Lấy phần tử form đăng ký từ DOM
    if (registerForm) {  // Kiểm tra nếu form tồn tại để tránh lỗi
        const fullnameInput = registerForm.querySelector("#fullname");  // Lấy input họ tên
        const emailInput = registerForm.querySelector("#email");  // Lấy input email
        const passwordInput = registerForm.querySelector("#password");  // Lấy input mật khẩu
        const confirmInput = registerForm.querySelector("#confirm");  // Lấy input xác nhận mật khẩu

        registerForm.addEventListener("submit", (e) => {  // Thêm sự kiện submit cho form
            e.preventDefault();  // Ngăn chặn hành vi mặc định của form (tránh reload trang)

            // Validation cơ bản
            if (!fullnameInput.value.trim()) {  // Kiểm tra nếu họ tên rỗng sau khi loại bỏ khoảng trắng
                alert("Vui lòng nhập họ và tên!");  // Hiển thị cảnh báo
                fullnameInput.focus();  // Focus vào input để người dùng nhập lại
                return;  // Dừng hàm
            }

            const emailValue = emailInput.value.trim();  // Lấy giá trị email và loại bỏ khoảng trắng thừa
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex kiểm tra định dạng email cơ bản
            if (!emailRegex.test(emailValue)) {  // Kiểm tra nếu email không hợp lệ
                alert("Email không hợp lệ!");  // Hiển thị cảnh báo
                emailInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            // Kiểm tra đuôi email BẮT BUỘC @gmail.com
            const lowerEmail = emailValue.toLowerCase();  // Chuyển email thành chữ thường để kiểm tra
            console.log("Debug: Email nhập vào (lowercase):", lowerEmail);  // Log debug để kiểm tra
            if (!lowerEmail.endsWith('@gmail.com')) {  // Kiểm tra nếu không kết thúc bằng @gmail.com
                alert("Email phải sử dụng đuôi chính xác @gmail.com! (Ví dụ: user@gmail.com)");  // Hiển thị cảnh báo
                emailInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }
            console.log("Debug: Email hợp lệ, qua validation domain.");  // Log debug nếu qua kiểm tra

            if (passwordInput.value.length < 6) {  // Kiểm tra độ dài mật khẩu
                alert("Mật khẩu phải ít nhất 6 ký tự!");  // Hiển thị cảnh báo
                passwordInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            if (passwordInput.value !== confirmInput.value) {  // Kiểm tra nếu mật khẩu và xác nhận khớp
                alert("Mật khẩu xác nhận không khớp!");  // Hiển thị cảnh báo
                confirmInput.focus();  // Focus vào input xác nhận
                return;  // Dừng hàm
            }

            // Lấy mảng users từ localStorage
            let users = getUsers();  // Gọi hàm helper để lấy users

            // Kiểm tra trùng tên
            const existingName = users.find(user =>  // Tìm user có fullname trùng
                user.fullname.toLowerCase() === fullnameInput.value.trim().toLowerCase()
            );
            if (existingName) {  // Nếu tìm thấy
                alert("Tên này đã được sử dụng! Vui lòng chọn tên khác.");  // Hiển thị cảnh báo
                fullnameInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            // Kiểm tra giới hạn 5 tài khoản per email
            const emailCount = users.filter(user => user.email === emailValue).length;  // Đếm số tài khoản với email này
            if (emailCount >= 5) {  // Nếu vượt quá 5
                alert("Email này đã đạt giới hạn 5 tài khoản! Vui lòng sử dụng email khác.");  // Hiển thị cảnh báo
                emailInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            // Lưu user mới
            const newUser = {  // Tạo đối tượng user mới
                fullname: fullnameInput.value.trim(),  // Lưu họ tên
                email: emailValue,  // Lưu email
                password: passwordInput.value  // Lưu mật khẩu
            };
            users.push(newUser);  // Thêm user vào mảng
            saveUsers(users);  // Lưu mảng users vào localStorage
            alert("Đăng ký thành công! Chuyển sang đăng nhập.");  // Hiển thị thông báo thành công
            registerForm.reset();  // Reset form để xóa dữ liệu nhập
            document.querySelector('.container').classList.remove('active');  // Toggle để ẩn form đăng ký và hiển thị form đăng nhập (giả sử class 'active' quản lý hiển thị)
        });
    }

    // Xử lý form đăng nhập (Login)
    const loginForm = document.getElementById("login-form");  // Lấy phần tử form đăng nhập
    if (loginForm) {  // Kiểm tra nếu form tồn tại
        const emailInput = loginForm.querySelector("#email");  // Lấy input email
        const passwordInput = loginForm.querySelector("#password");  // Lấy input mật khẩu

        loginForm.addEventListener("submit", (e) => {  // Thêm sự kiện submit
            e.preventDefault();  // Ngăn chặn hành vi mặc định

            // Validation cơ bản
            if (!emailInput.value.trim()) {  // Kiểm tra nếu email rỗng
                alert("Vui lòng nhập email!");  // Hiển thị cảnh báo
                emailInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            if (!passwordInput.value.trim()) {  // Kiểm tra nếu mật khẩu rỗng
                alert("Vui lòng nhập mật khẩu!");  // Hiển thị cảnh báo
                passwordInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            const emailValue = emailInput.value.trim();  // Lấy giá trị email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex kiểm tra email
            if (!emailRegex.test(emailValue)) {  // Kiểm tra định dạng
                alert("Email không hợp lệ!");  // Hiển thị cảnh báo
                emailInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            // Kiểm tra đuôi @gmail.com
            const lowerEmail = emailValue.toLowerCase();  // Chuyển email thành chữ thường
            if (!lowerEmail.endsWith('@gmail.com')) {  // Kiểm tra đuôi
                alert("Email phải sử dụng đuôi @gmail.com để đăng nhập!");  // Hiển thị cảnh báo
                emailInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            // Lấy mảng users
            const users = getUsers();  // Gọi hàm helper
            if (users.length === 0) {  // Nếu không có users
                alert("Bạn chưa đăng ký tài khoản! Chuyển sang đăng ký.");  // Hiển thị cảnh báo
                document.querySelector('.container').classList.add('active');  // Toggle để hiển thị form đăng ký
                return;  // Dừng hàm
            }

            // Tìm user khớp
            const user = users.find(u => u.email === emailValue && u.password === passwordInput.value);  // Tìm user với email và mật khẩu khớp
            if (!user) {  // Nếu không tìm thấy
                alert("Email hoặc mật khẩu không đúng!");  // Hiển thị cảnh báo
                passwordInput.value = "";  // Xóa mật khẩu để bảo mật
                passwordInput.focus();  // Focus vào input
                return;  // Dừng hàm
            }

            // Đăng nhập thành công
            localStorage.setItem("isLoggedIn", "true");  // Đặt cờ đăng nhập
            localStorage.setItem("currentUser", JSON.stringify(user));  // Lưu thông tin user hiện tại
            alert(`Chào mừng ${user.fullname}! Đăng nhập thành công.`);  // Hiển thị thông báo
            window.location.href = "oh.html";  // Chuyển hướng đến trang chính
        });
    }

    // Event cho nút toggle (như anh cung cấp)
    const registerBtn = document.querySelector('.register-btn');  // Lấy nút chuyển sang đăng ký
    if (registerBtn) {  // Kiểm tra nếu nút tồn tại
        registerBtn.addEventListener('click', () => {  // Thêm sự kiện click
            document.querySelector('.container').classList.add('active');  // Thêm class để hiển thị form đăng ký
            console.log('Chuyển sang form đăng ký');  // Log debug
        });
    }

    const loginBtn = document.querySelector('.login-btn');  // Lấy nút chuyển sang đăng nhập
    if (loginBtn) {  // Kiểm tra nếu nút tồn tại
        loginBtn.addEventListener('click', () => {  // Thêm sự kiện click
            document.querySelector('.container').classList.remove('active');  // Loại bỏ class để hiển thị form đăng nhập
            console.log('Chuyển sang form đăng nhập');  // Log debug
        });
    }
});