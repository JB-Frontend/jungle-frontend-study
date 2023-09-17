// 시간 초과 82.6 / 100
// 1. numbers 배열을 뒤에서 부터 탐색한다.  변수 최대값과 인덱스를 저장
// 2. 최대값보다 자신이 크면 최대값을 자신으로 바꾼다.
function solution(numbers) {
  const solution = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === 1000000 || i === numbers.length - 1) {
      solution.push(-1);
      continue;
    }
    for (let j = i; j < numbers.length; j++) {
      if (numbers[i] < numbers[j]) {
        solution.push(numbers[j]);
        break;
      }
      if (j === numbers.length - 1) solution.push(-1);
    }
  }
  return solution;
}
