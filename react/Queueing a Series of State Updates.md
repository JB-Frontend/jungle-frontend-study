# Queueing a Series of State Updates

<aside>
💡 we will learn

- 일괄처리(배칭, batching)이란 무엇이며 React가 여러 state 업데이트를 처리하는 방법
- 동일한 state 변수에서 여러 업데이트를 적용하는 방법
</aside>

state 변수를 설정하면 다음 렌더링이 `queue`(대기열)에 들어간다.
그러나 경우에 따라 다음 렌더링을 `queue`에 넣기 전에, 값에 대한 여러 작업을 수행하고 싶을 때가 있다.
이를 위해서는 React가 state업데이트를 어떤 방식으로 진행하는지 이해하는 것이 도움이 될 것이다.

## **React batches state updates (state 업데이트 일괄처리)**

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

`setNumber(number + 1)` 를 세 번 호출하므로 “+3” 버튼을 클릭하면 세 번 증가할 것으로 예상할 수 있지만, 이전 세션에서 보았듯이, [각 렌더링의 state 값은 고정](https://react-ko.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time)되어 있으므로, 첫번째 렌더링의 이벤트 핸들러의 `number` 값은 `setNumber(1)`을 몇 번 호출하든 항상 `0`입니다.

<aside>
💡 여기에는 논의 되어야 할 또 다른 요인이 있다.
**React는 state를 업데이트 하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다린다.**
이러한 이유로 모든 `setNumber()` 호출이 완료된 이후에만 렌더링이 일어난다.

</aside>

이 상황은 음식점에서 주문을 받는 웨이터와 같다고 볼 수 있다. 웨이터는 첫 번째 요리를 말하자마자 주방으로 달려가지 않는다. 대신 주문이 끝날 때까지 기다렸다가 주문을 변경하고, 심지어 테이블에 있는 다른 사람의 주문도 받는다.

> 이렇게 하면 너무 많은 리렌더링을 유발하지 않고도 여러 컴포넌트에서 나온 다수의 state변수를 업데이트 할 수 있다. 하지만 이는 이벤트 핸들러와 그 안에 있는 코드가 완료될 때까지 UI가 업데이트 되지 않는다는 의미이기도 하다. 일괄처리(배칭, batching)이라고 하는 이 동작은 React 앱이 훨씬 빠르게 실행될 수 있게 해준다. 또한 일부 변수만 업데이트된 “half-finished’ 렌더링을 피할 수 있게 해준다.
> 

React는 클릭과 같은 여러 의도적인 이벤트에 대해 일괄처리를 하진 않는다.
각 클릭은 개별적으로 처리되며 안전한 경우에만 일괄처리된다.
예를 들어, 첫 번째 클릭으로 form이 비활성화되면 두 번째 클릭으론 form이 다시 submit되지 않도록 보장한다.

## **Updating the same state multiple times before the next render
(다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트하기)**

다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트 하고 싶다면 `setNumber(number + 1)` 와 같은 *다음 state 값*을 전달하는 대신, `setNumber(n => n + 1)` 와 같이 큐의 이전 state를 기반으로 다음 state를 계산하는 *함수*를 전달할 수 있습니다. 이는 단순히 state 값을 대체하는 것이 아니라 React에게 “state 값으로 무언가를 하라”고 지시하는 방법입니다.

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

> 여기서 `n => n + 1` 는 **업데이터 함수(updater function)**라고 부릅니다.
> 

이를 state의 setter 함수(setNumber)에 전달 할 때:

1. React는 이벤트 핸들러의 다른 코드가 모두 실행된 후에 이 함수가 처리되도록 queue에 넣는다.
2. 다음 렌더링 중에 React는 queue를 순회하여 최종 업데이트된 state를 제공한다.

코드 작동 방식

1. `n => n + 1`함수를 queue에 추가한다. (총 3번 반복)
2. 다음 렌더링 중에 `useState` 를 호출하면 React는 큐를 순회한다. 이전 `number` state는 `0`이었으므로 React는 이를 첫 번째 업데이터 함수에 `n` 인수로 전달한다. 그런 다음 React는 이전 업데이터 함수의 리턴값을 가져와서 다음 업데이터 함수에 `n` 으로 전달하는 식으로 반복한다.
    
    
    | queued update | n | returns |
    | --- | --- | --- |
    | n => n + 1 | 0 | 0 + 1 = 1 |
    | n => n + 1 | 1 | 1 + 1 = 2 |
    | n => n + 1 | 2 | 2 + 1 = 3 |
3. React는 `3`을 최종 결과로 저장하고 `useState`에서 반환한다.

## **What happens if you update state after replacing it
(state를 교체한 후 업데이트하면 어떻게 될까?)**

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```

위 코드의 이벤트 핸들러 작동 순서:

1. `setNumber(number + 5)` : `number`는 `0`이므로 `setNumber(0 + 5)`이므로 React는 큐에 “다음 렌더링에 `number`를 `5`로 바꾸기”를 추가한다.
2. `setNumber(n => n + 1)` : `n => n + 1` 는 업데이터 함수이므로 React는 해당 함수를 큐에 추가한다.

다음 렌더링 동안 React는 state queue를 순회한다:

| queued update | n | returns |
| --- | --- | --- |
| “replace with 5” | 0 (unused) | 5 |
| n => n + 1 | 5 | 5 + 1 = 6 |

React는 `6`을 최종 결과로 저장하고 `useState`에서 리턴한다.

## **What happens if you replace state after updating it
(업데이트 후 state를 바꾸면 어떻게 될까?)**

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```

이 이벤트 핸들러를 실행하는 동안 React가 이 코드를 통해 작동하는 방식은 다음과 같습니다:

1. `setNumber(number + 5)`: `number` 는 `0` 이므로 `setNumber(0 + 5)`이므로 React는 “다음 렌더링에 `number`를 `5`로 바꾸기”를 큐에 추가한다.
2. `setNumber(n => n + 1)`: `n => n + 1` 는 업데이터 함수이므로 React는 *이 함수*를 큐에 추가한다.
3. `setNumber(42)`: React는 “다음 렌더링에 `number`를 `42`로 바꾸기”를 큐에 추가한다.

다음 렌더링 동안, React는 state queue를 순회한다:

| queued update | n | returns |
| --- | --- | --- |
| “replace with 5” | 0 (unused) | 5 |
| n => n + 1 | 5 | 5 + 1 = 6 |
| “replace with 42” | 6 (unused) | 42 |

React는 `42`를 최종 결과로 저장하고 `useState`에서 리턴한다.

<aside>
💡 요약
`setNumber` state setter함수에 전달할 내용은 다음과 같다.

- **업데이터 함수** (예: **`n => n + 1`**)가 queue에 추가됩니다.
- **다른 값** (예: 숫자 `42`)은 이미 queue에 있는 항목을 무시하고, queue에 “`42`로 바꾸기”를 추가한다.

이벤트 핸들러가 완료되면 React는 리렌더링을 실행한다. 리렌더링하는 동안 React는 큐를 처리한다. 업데이터 함수는 렌더링 중에 실행되므로, **업데이터 함수는 [순수](https://react-ko.dev/learn/keeping-components-pure)해야 하며** 결과만 리턴해야 합니다.
업데이터 함수 내부에서 state를 변경하거나 다른 사이드 이팩트를 실행하면 안 된다.
Strict 모드에서 React는 각 업데이터 함수를 두 번 실행(두 번째 결과는 버림)하여 오류를 찾을 수 있도록 도와준다.

</aside>

## Naming conventions (명명규칙)

업데이터 함수 인수의 이름은 해당 state 변수의 첫 글자로 지정하는 것이 일반적입니다:

```jsx
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

자세한 코드를 선호하는 경우 `setEnabled(enabled => !enabled)`와 같이 state 변수 이름을 반복하거나,
`setEnabled(prevEnabled => !prevEnabled)`와 같은 접두사(prefix *“prev”*)를 사용하는 것이 일반적인 규칙이다.

<aside>
❓ `setEnabled(prev => !prev)`의 사용은?

</aside>

---

## Recap

- state를 설정하더라도 기존 렌더링의 변수는 변경되지 않으며, 대신 새로운 렌더링을 요청한다.
- React는 이벤트 핸들러가 실행을 마친 후 state 업데이트를 처리합니다. 이를 일괄처리(배칭, batching)라고 한다.
- 하나의 이벤트에서 일부 state를 여러 번 업데이트하려면 `setNumber(n => n + 1)` 업데이터 함수를 사용할 수 있다.

---

## Challenge

1. fix a request counter
    - code
        
        ```jsx
        import { useState } from 'react';
        
        export default function RequestTracker() {
          const [pending, setPending] = useState(0);
          const [completed, setCompleted] = useState(0);
        
          async function handleClick() {
            setPending(prev => prev + 1);
            await delay(3000);
            setPending(prev => prev - 1);
            setCompleted(completed + 1);
          }
        
          return (
            <>
              <h3>
                Pending: {pending}
              </h3>
              <h3>
                Completed: {completed}
              </h3>
              <button onClick={handleClick}>
                Buy     
              </button>
            </>
          );
        }
        
        function delay(ms) {
          return new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        }
        ```
        
2. Implement the state queue yourself
    
    <aside>
    💡 이 알고리즘은 React가 최종 state를 계산하는데 실제로 사용하는 알고리즘이다.
    [https://codesandbox.io/s/es6uix?file=/processQueue.js&utm_medium=sandpack](https://codesandbox.io/s/es6uix?file=/processQueue.js&utm_medium=sandpack)
    
    </aside>
    
    - code
        
        ```jsx
        // App.js
        import { getFinalState } from './processQueue.js';
        
        function increment(n) {
          return n + 1;
        }
        increment.toString = () => 'n => n+1';
        
        export default function App() {
          return (
            <>
              <TestCase
                baseState={0}
                queue={[1, 1, 1]}
                expected={1}
              />
              <hr />
              <TestCase
                baseState={0}
                queue={[
                  increment,
                  increment,
                  increment
                ]}
                expected={3}
              />
              <hr />
              <TestCase
                baseState={0}
                queue={[
                  5,
                  increment,
                ]}
                expected={6}
              />
              <hr />
              <TestCase
                baseState={0}
                queue={[
                  5,
                  increment,
                  42,
                ]}
                expected={42}
              />
            </>
          );
        }
        
        function TestCase({
          baseState,
          queue,
          expected
        }) {
          const actual = getFinalState(baseState, queue);
          return (
            <>
              <p>Base state: <b>{baseState}</b></p>
              <p>Queue: <b>[{queue.join(', ')}]</b></p>
              <p>Expected result: <b>{expected}</b></p>
              <p style={{
                color: actual === expected ?
                  'green' :
                  'red'
              }}>
                Your result: <b>{actual}</b>
                {' '}
                ({actual === expected ?
                  'correct' :
                  'wrong'
                })
              </p>
            </>
          );
        }
        ```
        
        ```jsx
        // processQueue.js
        
        export function getFinalState(baseState, queue) {
          let finalState = baseState;
        
          // TODO: do something with the queue...
          queue.forEach(state => {
            if (typeof state === "function") finalState = state(finalState)
            else finalState = state
          })
        
          return finalState;
        }
        ```