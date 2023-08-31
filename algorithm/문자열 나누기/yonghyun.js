function solution(s) {
  var answer = 0;
  let index = 0;
  while (index != s.length) {
    let a = s[index];
    let a_count = 0, b_count = 0;

    while (index != s.length) {
      if (s[index++] === a) a_count++;
      else b_count++;

      if (a_count === b_count) {
        answer++;
        break;
      }
    }
    if (a_count !== b_count) answer++;
  }
  return answer;
}