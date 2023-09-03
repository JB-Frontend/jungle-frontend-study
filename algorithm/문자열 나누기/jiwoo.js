function solution(s) {
  const splitStr = (str, cnt) => {
    if (str.length < 2) {
      cnt++;
      return cnt;
    }

    let map = new Map();
    map.set(str[0], 1);

    outer: for (let i = 1; i <= str.length - 1; i++) {
      const next = str[i];

      if (map.has(next)) {
        map.set(next, map.get(next) + 1);
      } else {
        map.set(next, 1);
      }

      let max = 0;
      for (let [key, value] of map) {
        if (value > max) max = value;
        else if (value == max) {
          cnt++;
          const newStr = str.slice(i + 1, str.length);
          if (newStr.length > 0) cnt = splitStr(newStr, cnt);
          break outer;
        }
      }
    }
    return cnt;
  };

  let cnt = 0;
  var answer = splitStr(s, cnt);
  return answer;
}
