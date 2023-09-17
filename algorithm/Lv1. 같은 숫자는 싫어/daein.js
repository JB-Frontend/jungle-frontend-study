function solution(arr) {
  let prev;
  let answer = arr.filter((index) => {
    if (index !== prev) {
      prev = index;
      return true;
    }
  });
  return answer;
}
