const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split()
  .map(Number);

const N = input[0];
const arr = Array(267 * 10000)
  .fill()
  .map((v, i) => i + 1);

let i = 0;
let ans = 0;

for (let value of arr) {
  if (String(value).includes("666")) i++;
  if (N === i) {
    ans = value;
    break;
  }
}
console.log(ans);
