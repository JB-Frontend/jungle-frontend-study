function solution(k, tangerine) {
  var answer = 0;
  let arr = Array(10000001).fill(0);
  for (let i = 0; i < tangerine.length; i++) {
    arr[tangerine[i]]++;
  }
  let my_arr = [];
  for (let i = 0; i < 10000001; i++) {
    if (arr[i] != 0) my_arr.push(arr[i]);
  }

  my_arr.sort(function (a, b) {
    return b - a;
  })

  for (let i = 0; i < my_arr.length; i++) {
    answer++;
    k -= my_arr[i];
    if (k <= 0) break;
  }

  return answer;
}
