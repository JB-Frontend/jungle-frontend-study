# State as a Snapshot

<aside>
💡 we will learn

- state 설정으로 리렌더링이 촉발되는 방식
- state 업데이트 시기 및 방법
- state를 설정한 직후에 state가 업데이트되지 않는 이유
- 이벤트 핸들러가 state의 ‘스냅샷’에 액세스하는 방법
</aside>

## **Setting state triggers renders
(state를 설정하는 것은 렌더링의 트리거가 됩니다.)**

클릭과 같은 사용자 이벤트에 반응하여 UI가 직접 변경된다고 생각할 수 있다.
React에서는 이와는 다르게 작동한다. 인터페이스가 이벤트에 반응하려면 state를 업데이트해야 한다.

```jsx
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```

위의 코드의 발생 순서

1. `onSubmit` 이벤트 핸들러가 실행됩니다.
2. `setIsSent(true)`가 `isSent`를 `true`로 설정하고 새 렌더링을 큐에 대기시킵니다.
3. React는 새로운 `isSent` 값에 따라 컴포넌트를 다시 렌더링합니다.

자 그럼 state와 렌더링에 대해 좀 더 자세히 살펴보자

## **Rendering takes a snapshot in time
(렌더링은 그 시점의 스냅샷을 찍습니다.)**

<aside>
💡 렌더링이란?
React가 컴포넌트, 즉 함수를 호출한다는 뜻이다.
해당 함수에서 반환하는 `JSX`는 그 당시의 UI의 스냅샷과 같다.
`prop`, `event handler`, `local variables` 는 모두 렌더링 당시의 state를 사용해 계산된다.

</aside>

React가 컴포넌트를 re-rendering하는 경우

1. React가 함수를 다시 호출한다.
2. 함수가 새로운 JSX 스냅샷을 리턴한다.
3. React가 리턴된 스냅샷과 일치하도록 화면을 업데이트한다.

![Screenshot 2023-09-06 at 6.06.50 PM.png](State%20as%20a%20Snapshot%20ff94a17a009842079234c6e0f39878af/Screenshot_2023-09-06_at_6.06.50_PM.png)

state는 컴포넌트의 메모리이며, 함수가 리턴된 후 사라지지 않는다.
state는 함수 외부에 있는 것처럼 React 자체에 ‘존재’한다.
컴포넌트 호출 → 특정 렌더링에 대한 state의 스냅샷 제공 → 컴포넌트는 해당 렌더링의 state 값을 사용해 새로운 props, event handler등이 포함된 스냅샷을 JSX에 리턴

![Screenshot 2023-09-06 at 6.11.01 PM.png](State%20as%20a%20Snapshot%20ff94a17a009842079234c6e0f39878af/Screenshot_2023-09-06_at_6.11.01_PM.png)

작동 예제

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

위의 코드에서 `+3버튼` 은 실제로 클릭당 3씩 증가할까?

<aside>
💡 state를 설정하면 다음 렌더링에 대해서만 변경된다.
따라서 해당 렌더링의 `onClick`핸들러에서 `setNumber(number + 1)`가 호출된 후에도 number의 값은 여전히 `0`이다.

</aside>

`setNumber(number + 1)`을 세 번 호출하여도 다음 렌더링으로 넘어가지 않았기 때문에 계속해서 `number`는 `0`이고, `setNumber`를 실행할 때마다 다음 렌더링에서 `number`를 `1`로 변경할 준비를 합니다.

위의 코드에서 처음 클릭할 때의 number는 아래의 코드와 의미상 같다.

```jsx
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```

따라서 각 클릭마다 +1 씩 증가하게 된다.

## **State over time (시간 경과에 따른 state)**

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

위의 코드에서 `alert` 또한 마찬가지로 `setNumber(number + 5)`의 결과가 다음 렌더링에 적용되므로 `number`는 아직 `0`이다.
따라서, `alert(number);`는 `alert(0);` 과 의미가 같다.

그렇다면 setTimeout을 활용해 re-rendering된 후에 발동시키면 어떻게 될까?

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

이 또한 마찬가지로 0을 출력하는 것을 알 수 있다.

위의 코드에서 처음 클릭할 때의 number는 아래의 코드와 의미상 같다.

```jsx
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

React에 저장된 states는 `alert`가 실행될 때 변경되었을 수 있지만, 사용자가 상호작용한 시점에 state로 이미 예약되었기 때문에 출력에는 변함이 없다.

<aside>
💡 **state 변수의 값은** 이벤트 핸들러의 코드가 비동기적이더라도 **렌더링 내에서 절대 변경되지 않는다.**

</aside>

해당 렌더링의 `onClick` 내에서, `setNumber(number + 5)`가 호출된 후에도 `number`의 값은 계속 `0`이다. 이 값은 컴포넌트를 호출해 React가 UI의 스냅샷을 찍을 때 고정된 값이다.

**React는 하나의 렌더링 이벤트 핸들러 내에서 state 값을 고정으로 유지한다.**
코드가 실행되는 동안 state가 변경되었는지 신경 쓸 필요가 없다.

---

## Recap

- state를 설정하면 새 렌더링을 요청합니다.
- React는 컴포넌트 외부에 마치 선반에 보관하듯 state를 저장합니다.
- ‘useState’를 호출하면 React는 해당 렌더링에 대한 state의 스냅샷을 제공합니다.
- 변수와 이벤트 핸들러는 다시 렌더링해도 “살아남지” 않습니다. 모든 렌더링에는 각각의 이벤트 핸들러가 있습니다.
- 모든 렌더링(과 그 안에 있는 함수)은 항상 React가 *그 렌더링*에 제공한 state의 스냅샷을 “보게” 됩니다.
- 렌더링된 JSX를 생각하는 방식과 유사하게 이벤트 핸들러에서 state를 정신적으로 대체할 수 있습니다.
- 과거에 생성된 이벤트 핸들러는 그것이 생성된 렌더링 시점의 state 값을 갖습니다.

---

## Challenge

```jsx
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(`다음은 ${walk ? "Stop" : "Walk"}입니다.`);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
```