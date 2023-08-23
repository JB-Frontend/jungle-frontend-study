const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const inputValue = Number(input[0]);

let tripleSixArrray = [];
let i = 666;
while (tripleSixArrray.length !== inputValue) {
    let iString = i.toString();
    let count = iString.match("666");
    if (count !== null) {
        tripleSixArrray.push(i);
    }
    i += 1;
}

// console.log(iString);
console.log(tripleSixArrray[inputValue - 1]);
