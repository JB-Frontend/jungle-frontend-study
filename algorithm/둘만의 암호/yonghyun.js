function solution(s, skip, index) {
  let a = 'a'.charCodeAt(0);
  let z = 'z'.charCodeAt(0);
  let set = new Set();

  for (let i = 0; i < skip.length; i++) set.add(skip[i].charCodeAt(0));
  console.log(set)
  console.log(z)

  var answer = '';
  for (let i = 0; i < s.length; i++) {
    let b = s[i].charCodeAt(0);
    console.log(b)
    let temp = index;

    while (temp !== 0) {
      b++;
      if (b > z) b = a;
      if (!set.has(b)) {
        temp--;
      }
    }
    answer += String.fromCharCode(b);
  }
  return answer;
}