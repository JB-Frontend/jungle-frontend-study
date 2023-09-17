function solution(order) {
  let answer = 0;
  let stack = 0;

  for (let i = 0; i < order.length; i++) {
    if (i + 1 === order.length) {
      return order.length;
    }
    if (order[i] - order[i + 1] === 1) {
      stack = order[i];
      continue;
    }
    if (stack + 1 === order[i + 1]) {
      stack = order[i + 1];
      continue;
    }
    answer = i + 1;
    break;
  }
  return answer;
}
