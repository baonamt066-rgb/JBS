// mảng trong javascript
// index bắt đầu từ 0 và kết thúc ở length - 1
// length: độ dài của mảng (myArray.length) (5 phần tử thì length = 5)
let myArray = [10, 20, 30, 40, 50];
console.log("Mảng ban đầu:", myArray);

let a = [];

// Lấy ra phần tử cụ thể bằng cách sử dụng chỉ số (index)
// cú pháp: arrayName[index]
console.log("Phần tử đầu tiên:", myArray[0]); // 10
console.log("Phần tử thứ hai của mảng myArray:", myArray[1]);

// duyệt mảng sử dụng vòng lặp for
// length: độ dài của mảng (myArray.length)
for (let i = 0; i < myArray.length; i++) {
  console.log(`Phần tử tại index ${i}:`, myArray[i]);
}

// thêm phần tử vào cuối mảng sử dụng push
myArray.push(60);
console.log("Mảng sau khi thêm phần tử:", myArray);

// thêm phần tử vào đầu mảng sử dụng unshift
// cú pháp: arrayName.unshift(element);
myArray.unshift(0);
console.log("Mảng sau khi thêm phần tử vào đầu:", myArray);

// thêm phần tử vào đầu mảng sử dụng splice
// cú pháp: arrayName.splice(startIndex, deleteCount, element1, element2, ...);
myArray.splice(2, 0, 15); // thêm 15 vào index 2
console.log("Mảng sau khi sử dụng splice để thêm phần tử:", myArray);

// cập nhật phần tử trong mảng
// cú pháp: arrayName[index] = newValue;
myArray[3] = 35; // cập nhật phần tử tại index 3 thành 35
console.log("Mảng sau khi cập nhật phần tử:", myArray);

// tìm kiếm phần tử bằng cách sử dụng indexOf
// cú pháp: arrayName.indexOf(element);
// trả về index của phần tử nếu tìm thấy, ngược lại trả về -1
let index = myArray.indexOf(30);
if (index !== -1) {
  console.log(`Phần tử 30 được tìm thấy tại index: ${index}`);
} else {
  console.log("Phần tử 30 không tồn tại trong mảng");
}

// xóa phần tử cuối cùng trong mảng sử dụng pop
// cú pháp: arrayName.pop();
let removedElement = myArray.pop();
console.log("Phần tử bị xóa:", removedElement);
console.log("Mảng sau khi xóa phần tử cuối cùng:", myArray);

// xóa phần tử đầu tiên trong mảng sử dụng shift
// cú pháp: arrayName.shift();
// let removedElement = myArray.shift();
// console.log("Phần tử bị xóa:", removedElement);
// console.log("Mảng sau khi xóa phần tử đầu tiên:", myArray);

let human = {
  name: "John",
  age: 30,
  isMarried: false,
  hobbies: ["reading", "traveling", "swimming"],
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
};
console.log("Object human:", human);

// truy cập giá trị trong object sử dụng key
// cú pháp: objectName.key hoặc objectName["key"]
console.log("Tên của human:", human.name);
console.log("Tuổi của human:", human["age"]);
console.log("Địa chỉ của human:", human.address.city);

// thêm hoặc cập nhật key-value trong object
// cú pháp: objectName.newKey = newValue
human.job = "Developer"; // thêm key-value mới
human.age = 4; // cập nhật giá trị của key age
console.log("Object human sau khi thêm/cập nhật:", human);

// duyệt object sử dụng vòng lặp for...in
for (let key in human) {
  console.log(`Key: ${key}, Value: ${human[key]}`);
}

// xóa key-value trong object sử dụng delete
// cú pháp: delete objectName.key;
delete human.isMarried;
console.log("Object human sau khi xóa isMarried:", human);

// tương tác với DOM
// document.getElementById()
let demoElement = document.getElementById("demo").innerHTML = "Hello JavaScript!";
console.log("Nội dung của phần tử có id 'demo':", demoElement);