# 1062 가르침
이 문제는 알파벳 중 단어에 포함되는 알파벳을 구하는 문제로 조합 문제라고 할 수 있다.   
알파벳 개수는 총 26개이고 단어의 글자는 최대 15이므로 가장 크게 생길 수 있는 경우의 수는 <sub>26</sub>C<sub>13</sub>으로 5,005,005가 된다.  
하지만 남극단어에 항상 포함되는 `a`, `n`, `t`, `i`, `c`를 제외한다면 <sub>21</sub>C<sub>10</sub>이 되므로 경우의 수는 352,716으로 줄어들게 된다.  
따라서 먼저 남극단어에 포함되는 알파벳을 제외 시켰다.  
```js
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
```
그리고 조합 알고리즘을 만들어 풀었다.  
```js
if (!al[index]) {
  al[index] = true;
  cal(index + 1, cnt + 1)
  al[index] = false;
}

cal(index + 1, cnt)
```