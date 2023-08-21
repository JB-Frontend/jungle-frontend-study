# 1436 영화감독 숌

```js
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
```
그냥 단순하게 숫자를 계속 늘리면서 `666`이 있을 경우 count를 증가시키는 방식으로 완전 탐색하며 풀었다.  
이 문제는 삽질을 많이 했다.  
```js
while (a !== 0) {
  b++;
  var cnt = 0;
  var temp = b;
  while (!(cnt === 3 || temp === 0)) {
    if (temp % 10 === 6) cnt++;
    else cnt = 0;
    temp = Math.floor(temp / 10);
  }
  if (cnt === 3) a--;
}
```
처음에는 위 처럼 모든 자리 수를 확인하면서 연속된 6이 3개 있으면 숫자를 세는 식으로 코드를 짰다. 위 코드도 `666`이 있는지 확인하는데 시간복잡도가 `O(n)`이 들고 정답 코드의 `String(num).includes('666')`도 시간복잡도가 `O(n)`이라는데 왜 한 코드만이 시간초과가 나는지 잘 모르겠다;;