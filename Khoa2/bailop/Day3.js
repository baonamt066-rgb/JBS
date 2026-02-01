// Kiểu dữ liệu number trong JavaScript
let a = 1;
let b = -2;
let c = 12.5;
let d = -0.5;

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);

// Kiểu dữ liệu string trong JavaScript
let result = 0 / 0; // Chia số 0 cho 0
console.log(result); // Output: NaN

let invalidOperation = 'hello' * 10; // Phép toán không hợp lệ giữa chuỗi và số
console.log(invalidOperation); // Output: NaN

let positiveInfinity = 1 / 0; // Chia số dương cho 0
console.log(positiveInfinity); // Output: Infinity

let negativeInfinity = -1 / 0; // Chia số âm cho 0
console.log(negativeInfinity); // Output: -Infinity

// Toán tử số học trong JavaScript
let x = 10;
let y = 3;

console.log("Cộng:", x + y);    // Phép cộng
console.log("Trừ:", x - y);     // Phép trừ
console.log("Nhân:", x * y);    // Phép nhân
console.log("Chia:", x / y);    // Phép chia
console.log("Chia lấy dư:", x % y);  // Phép chia lấy dư (Modulo)
console.log("Lũy thừa:", x ** y); // Phép lũy thừa
console.log("Tăng 1:", ++x);    // Tăng giá trị của x lên 1 (Pre-increment)
console.log("Giảm 1:", --y);    // Giảm giá trị của y xuống 1 (Pre-decrement)

//=================================
// Variable: Biến trong JavaScript
// Khai báo biến trong JavaScript
// let variable = value;
// let: data type
// variable_name: tên biến
// value: giá trị của biến
//=================================

let z = 10;

z += 5;
console.log(z); // 30

z -= 10;
console.log(z); // 20

z *= 2;
console.log(z); // 40

z /= 4;
console.log(z); // 10

//=================================
// Toán tử so sánh trong Javascript ===
//=================================
let m = 5;
let n = 3;
let p = "5";

console.log("Bằng (==):", m == p); // So sánh bằng giá trị và kiểm tra về false
console.log("Khác (!=):", m != p); // So sánh khác giá trị hoặc kiểm tra về true

// console.log("Bằng (==):", m == n); // So sánh bằng giá trị trả về false
// console.log("Khác (!=):", m != n); // So sánh khác giá trị trả về true
// console.log("Lớn hơn (>):", m > n); // So sánh lớn hơn
// console.log("Nhỏ hơn (<):", m < n); // So sánh nhỏ hơn
// console.log("Lớn hoặc bằng (>=):", m >= n); // So sánh lớn hơn hoặc bằng
// console.log("Nhỏ hoặc bằng (<=):", m <= n); // So sánh nhỏ hơn hoặc bằng

//=================================
// Toán tử logic trong Javascript ===
//=================================
let isAdult = true;
let hasID = false;

console.log("AND (&&):", isAdult && hasID); // Trả về true nếu cả hai đều true
console.log("OR (||):", isAdult || hasID); // Trả về true nếu ít nhất một trong hai là true
console.log("NOT (!):", !isAdult); // Đảo ngược giá trị boolean

//=================================
// Cấu trúc điều kiện if...else ====
//=================================

a = 40;
b = 20;

if (a > b) {
    console.log("a lớn hơn b");
} else if (a < b) {
    console.log("a nhỏ hơn b");
} else {
    console.log("a bằng b");
}


//=================================
// Vòng lặp for trong JavaScript ====
//=================================

for (let i = 0; i < 5; i++){
    console.log("Lặp lần thứ:", i);
}

// Sử dụng while khi bạn không biết trước số lần lặp
let count = 0;
while (count < 5) {
    console.log("While lặp lần thứ:", count);
    count++;
}

// Sử dụng do...while để đảm bảo vòng lặp chạy ít nhất một lần
let num = 0;
do {
    console.log("Do...while lặp lần thứ:", num);
    num++;
} while (num < 5);
