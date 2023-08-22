// 문제를 제대로 안읽어 예제 답만 맞는 상황
//! every word is start with 'anta', end with 'tica'

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, k] = input[0].split(" "); // string

const setArray = [];

for (let i = 1; i <= Number(n); i++) {
    let setI = new Set(input[i]);
    if (setI.size <= Number(k)) {
        // set size가 k를 넘어가면 제외
        setArray.push([...setI]);
    }
}
// console.log(setArray);

if (setArray.length === 0) {
    console.log(0);
} else {
    let answer = 1;
    for (let i = 0; i < setArray.length; i++) {
        let result = 1;
        let maxSet = setArray[i];
        for (let j = i + 1; j < setArray.length; j++) {
            let newSet = new Set([...maxSet, ...setArray[j]]);
            if (newSet.size <= k) {
                maxSet = [...newSet];
                result += 1;
            }
            result > answer ? (answer = result) : (answer = answer);
        }
    }
    console.log(answer);
}
