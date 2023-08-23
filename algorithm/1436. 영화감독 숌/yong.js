const fs = require('fs');

fs.readFile('/dev/stdin', 'utf-8', (err, data) => {
  if (err) return;

  const N = Number(data);

  let num = 666;
  let count = 0;

  while (true) {
    if (String(num).includes('666')) {
      count++;
    }
    if (count === N) {
      console.log(num);
      break;
    }
    num++;
  }
});