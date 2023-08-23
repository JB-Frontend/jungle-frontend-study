자바스크립트 문법에 익숙해지기 위한 문제  

```js
answer.push(arr[0])
for (let i = 1; i < arr.length; i++) {
  if (answer[answer.length - 1] !== arr[i]) answer.push(arr[i])
}
```
`answer` 배열의 마지막 값과 비교하면서 다를 경우에만 `push`하는 식으로 짰다.