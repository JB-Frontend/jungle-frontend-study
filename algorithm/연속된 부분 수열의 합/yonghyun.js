function solution(sequence, k) {
  var answer = [0, sequence.length - 1];
  let start = 0, end = 0;
  let sum = 0;
  let l = sequence.length;

  while (start < l) {
    if (sum == k && end - 1 - start < answer[1] - answer[0]) {
      answer = [start, end - 1];
    }
    if (sum < k && end != l) sum += sequence[end++];
    else sum -= sequence[start++];
  }
  return answer;
}