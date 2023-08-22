const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

// function getLetters(str, arr) {
//   let tmp_arr = [];
//   for (let value of arr) {
//     tmp_arr.push(value); // 임시 배열 초기화
//   }
//   const mid = str.slice(4, str.length - 4); // 앞, 뒤의 'anta'와 'tica' 제거한 문자열
//   for (let value of mid) {
//     if (!tmp_arr.includes(value)) tmp_arr.push(value); // 중복되지 않는 글자만 임시 배열에 추가
//   }
//   return tmp_arr;
// }

let ans = 0;
let words = [];
let letters = ["a", "n", "t", "i", "c"];

for (let i = 1; i <= N; i++) {
  words.push(input[i]);
}

for (let word of words) {
  const tmp_letters = getLetters(word, letters); // 해당 단어의 글자 리스트 리턴
  if (tmp_letters.length <= K) {
    letters = tmp_letters;
    ans++;
  }
  console.log(tmp_letters.length);
}
console.log(ans);
