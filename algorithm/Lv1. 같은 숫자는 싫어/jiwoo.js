function solution(arr) {
  let answer = [];
  let current = 99;

  for (let value of arr) {
    if (current !== value) {
      answer.push(value);
      current = value;
    }
  }
  return answer;
}
