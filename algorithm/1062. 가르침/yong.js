const fs = require('fs');
const al = Array(26).fill(false)
let arr = []
let N, K;
let ans = 0;

function cal(index, cnt) {
  if (cnt === K) {
    let temp = 0;
    for (let i = 0; i < N; i++) {
      let flag = false;
      for (let j = 0; j < arr[i].length; j++) {
        if (!al[arr[i][j].charCodeAt(0) - 'a'.charCodeAt(0)]) flag = true;
      }
      if (!flag) temp++;
    }
    ans = temp > ans ? temp : ans;
    return;
  }
  if (index == 26) return;

  if (!al[index]) {
    al[index] = true;
    cal(index + 1, cnt + 1)
    al[index] = false;
  }

  cal(index + 1, cnt)
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) return;
  let inputs = data.split('\n')
  N = Number(inputs[0].split(' ')[0])
  K = Number(inputs[0].split(' ')[1])

  if (K < 5) {
    console.log(ans);
    return;
  }

  for (let i = 1; i <= N; i++) arr.push(inputs[i])

  const a = 'a'.charCodeAt(0) - 'a'.charCodeAt(0);
  const n = 'n'.charCodeAt(0) - 'a'.charCodeAt(0);
  const t = 't'.charCodeAt(0) - 'a'.charCodeAt(0);
  const i = 'i'.charCodeAt(0) - 'a'.charCodeAt(0);
  const c = 'c'.charCodeAt(0) - 'a'.charCodeAt(0);
  // console.log(a, n, t, i, c)
  al[a] = true;
  al[n] = true;
  al[t] = true;
  al[i] = true;
  al[c] = true;

  cal(0, 5)
  console.log(ans)
})