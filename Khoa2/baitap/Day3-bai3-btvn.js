let str = prompt("Nhập chuỗi:");
let reversed = "";

for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
}

console.log(str + reversed.slice(1));
  