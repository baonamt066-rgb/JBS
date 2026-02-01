console.log("Hello World");

// Statement
// var: Biến toàn cục - Sử dụng trong toàn bộ chương trình
// let: Biến cục bộ - Sử dụng trong một khối lệnh
// const: Hằng số - Giá trị không thể thay đổi

var age = 18;
let num = 19;
const pi = 3.14;

// Quy tắc đặt tên biến
// 1. Tên biến không được trùng với từ khóa của JS: var, let, const, if, class, ...
// 2. Tên biến không được bắt đầu bằng số
// 3. Sử dụng camelCase để đặt tên biến: myClassName
// 4. Tên biến nên đặt theo ý nghĩa của giá trị, nên sử dụng danh từ và Tiếng anh
let myAge = 20;
let studentName = "John Doe";
const birthYear = 2000;

// Tên: firstName
// Họ: lastName
// Email: emailAddress
// Ngày tạo: createdAt
// Ngày cập nhật: updateAt
// Ngày xóa: deleteAt

// Kiểu dữ liệu trong JS

// 1. Number: Số
// - Interger: Số nguyên
// - Float: Số thực
let score = 100;
const pii = 3.14159;

// 2. String: Chuỗi kí tự
let fullName = "Trần Đức vũ";
let companyName = "MindX Technology School";

// 3. Boolean: Logic (true/false)
const passExam = true;
let islogin = false;

// 4. Undefined: Chưa xác định
let address;
console.log(address); // undefined

// 5. Null: Rỗng
let phoneNumber = null;
console.log(phoneNumber); //  null

// Các phép toán cơ bản trong JS
let a = 10;
let b = 3;

const phepCong = a + b;
const phepTru = a - b;
const phepNhan = a * b;
const phepChia = a / b;
const phepDu = a % b;
const luyThua = a ** b;

console.log("Phép cộng:", phepCong);
console.log("Phép trừ:", phepTru);
console.log("Phép nhân:", phepNhan);
console.log("Phép chia:", phepChia);
console.log("Phép chia lấy dư:", phepDu);
console.log("Lũy thừa:", luyThua);

// Truy cập kí tự trong chuỗi bằng chỉ số
const mindx = "MindX";
console.log("First char", mindx[0]);

const company = "Technology School";
const result = mindx + " " + company; 
console.log(result);

// Đếm độ dài chuỗi 
console.log("Chuỗi kết quả có độ dài:", result.length);
// Tách chuỗi thành mảng theo dấu phẩy
const JSA52 = "Bảo Nam,Hòa,Đạt,Tuấn Nam,Sơn";
const dsHocSinh = JSA52.split(",");
console.log("Danh sách học sinh:", dsHocSinh);

// Chuyển chuỗi thành chữ hoa
const helloworld = "Hello World!";
console.log(helloworld.toUpperCase());

// Chuyển chuỗi thành chữ thường
console.log(helloworld.toLowerCase());

// Xóa khoảng trắng thừa ở đầu và cuối chuỗi
const stringWithSpaces = "  MindX Technology School  ";
console.log(stringWithSpaces.trim());

// BT1:
