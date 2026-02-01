let users = [
  { id: 1, name: "Nam" },
  { id: 2, name: "Lan" },
  { id: 3, name: "Minh" }
];

console.log("Mảng user ban đầu:", users);

users.push({ id: 4, name: "Hà" });
console.log("Sau khi thêm user:", users);

for (let i = 0; i < users.length; i++) {
  if (users[i].id === 2) {
    users[i].name = "Lan Updated";
  }
}
console.log("Sau khi cập nhật user id=2:", users);

let deleteId = 3;
for (let i = 0; i < users.length; i++) {
  if (users[i].id === deleteId) {
    users.splice(i, 1);
    break;
  }
}
console.log("Sau khi xóa user id=3:", users);

let person = {
  name: "John",
  age: 25,
  city: "Hanoi"
};

console.log("Person ban đầu:", person);

person.email = "john@example.com";
console.log("Sau khi thêm email:", person);

delete person.age;
console.log("Sau khi xóa tuổi:", person);

document.getElementById("demo").innerHTML = "Mở console để xem kết quả";
