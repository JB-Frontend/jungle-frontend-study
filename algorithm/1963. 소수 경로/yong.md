# 1963 소수경로

```js
for (let i = 2; i <= 10000; i++) {
  if (!prime[i]) {
    let a = 2 * i;
    while (a <= 10000) {
      prime[a] = true;
      a += i;
    }
  }
}
```
10000 이하의 값은 없기 때문에 10000 이하의 소수를 `에라토스테네스의 체`를 이용하여 모두 구했다.

```js
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

```
그리고 bfs를 돌면서 완전 탐색을 해서 답을 구했다. 탐색하면서 생성되는 트리의 depth가 곧 몇 번을 돌렸는지가 되기 때문에 `while(size !== 0)` 만큼 반복문을 돌고 cnt를 늘리는 식으로 해서 답을 저장하였다.  
위 코드에서 `queue`의 첫번째 원소를 pop하는데  `shift()`를 사용하기 때문에 `O(n)` 시간복잡도가 든다(불편)  

```js
if (a >= 1000 && !visit[a] && !prime[a]) {
  visit[a] = true;
  queue.push(a);
}
```
이미 방문한 숫자는 `visit[a] = true`를 하여 다시 큐에 들어가지 못하도록하여 최적화를 했다.


