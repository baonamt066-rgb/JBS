let n = Number(prompt("Nhập số nguyên dương:"));

while (n <= 0 || !Number(n)) {
    n = Number(prompt("Nhập lại số nguyên dương:"));
}

let tongChan = 0;
let tongLe = 0;

for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
        tongChan += i;
    } else {
        tongLe += i;
    }
}

console.log("Tổng số chẵn:", tongChan);
console.log("Tổng số lẻ:", tongLe);
