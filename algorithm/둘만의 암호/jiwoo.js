function solution(s, skip, index) {
  let answer = "";
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const nextTo = (pointer) => {
    pointer += 1;
    if (pointer > 25) return 0;
    return pointer;
  };

  for (let c of s) {
    let pointer = alphabets.indexOf(c);
    let alpha = "";
    for (let i = 0; i < index; i++) {
      pointer = nextTo(pointer);
      alpha = alphabets[pointer];
      while (skip.includes(alpha)) {
        pointer = nextTo(pointer);
        alpha = alphabets[pointer];
      }
    }
    answer += alpha;
  }
  return answer;
}
