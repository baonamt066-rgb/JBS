let str = "MindX Technology School";
let greeting = "Welcome to " + str;
let shortStr = str.substring(0, 5);
let lengthStr = str.length;

console.log("Chuỗi gốc:", str);
console.log("Sau khi nối:", greeting);
console.log("Cắt chuỗi:", shortStr);
console.log("Độ dài chuỗi:", lengthStr);

let userInput = prompt("Nhập một chuỗi bất kỳ:");
let upperCaseInput = userInput.toUpperCase();
console.log("Chuỗi sau khi in hoa:", upperCaseInput);

let userName = "Bảo Nam";
let userAge = 16;
console.log(`Tên bạn là ${userName} và bạn ${userAge} tuổi.`);

let sentence = prompt("Nhập một câu bất kỳ:");
console.log("Câu bạn nhập là:", sentence);
console.log("Độ dài của câu là:", sentence.length);
