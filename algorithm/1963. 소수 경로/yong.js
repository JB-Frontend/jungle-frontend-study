const fs = require('fs');
const { join } = require('path');
const prime = Array(10000).fill(false);



for (let i = 2; i <= 10000; i++) {
  if (!prime[i]) {
    let a = 2 * i;
    while (a <= 10000) {
      prime[a] = true;
      a += i;
    }
  }
}

function cal(start, end) {
  const queue = [];
  const visit = Array(10000).fill(false);
  visit[start] = true;
  queue.push(start);
  let cnt = 0;

  while (queue.length !== 0) {
    let size = queue.length;

    while (size !== 0) {
      let cur = queue.shift();
      if (cur === end) return cnt;

      for (let i = 3; i >= 0; i--) {
        let temp = Array.from(String(cur));
        for (let j = 0; j < 10; j++) {
          temp[i] = String.fromCharCode(j + 48);
          // console.log("temp ", temp)
          let a = Number(temp.join(''));
          // console.log(a)
          if (a >= 1000 && !visit[a] && !prime[a]) {
            visit[a] = true;
            queue.push(a);
          }
        }
      }

      size--;
    }
    cnt++;
  }

  return "Impossible"
}


fs.readFile('/dev/stdin', 'utf-8', (err, data) => {
  if (err) return;
  const inputs = data.split('\n');
  let num = Number(inputs[0]);
  // console.log(num);

  for (let i = 1; i <= num; i++) {
    let input = inputs[i].split(' ');
    console.log(cal(Number(input[0]), Number(input[1])))
  }

});