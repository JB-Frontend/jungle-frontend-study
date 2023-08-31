function solution(numbers) {
  let l = numbers.length;
  var answer = Array(l);
  let stack = [];
  stack.push([0, numbers[0]]);

  for (let i = 1; i < l; i++) {
    while (stack.length !== 0) {
      if (stack[stack.length - 1][1] < numbers[i]) {
        let a = stack.pop();
        answer[a[0]] = numbers[i];
      } else break;
    }

    stack.push([i, numbers[i]])
  }

  while (stack.length !== 0) {
    let a = stack.pop();
    answer[a[0]] = -1;
  }

  return answer;
}