## State: 컴포넌트의 메모리

### 학습 내용

- state 변수 추가하기
- useState 까보기
- 컴포넌트에 여러 state 변수 지정하기
- State is isolated and private

### 지역 변수와 렌더링

```javascript
export function App() {
  let count = 0;

  function handleCount() {
    count++;
  }

  return (
    <>
      <h2>{count}</h2>
      <button onClick={handleCount}>+</button>
    </>
  );
}
```

handleCount 이벤트 핸들러가 지역 변수 count를 업데이트하고 있다. 그러나 두 가지 이유로 변경 사항이 표시되지 않는다.

1. 지역 변수는 렌더링 간에 값이 유지되지 않는다. React는 컴포넌트를 두 번째로 렌더링할 때 지역 변수에 대한 변경 사항을 고려하지 않고 처음부터 렌더링한다. 즉, count는 다시 0이 된다.
2. 지역 변수를 변경해도 렌더링이 발생하지 않는다.

### useState

컴포넌트를 새 데이터로 업데이트하고 렌더링하기 위해, React에서는 useState 훅을 제공한다. useState는 두 가지 작업을 수행한다.

1. 렌더링 사이에 데이터를 유지한다.
2. 새로운 데이터로 컴포넌트를 렌더링(리렌더링)하도록 React를 촉발한다.

useState 훅은 이 두 가지를 제공한다.

1. 렌더링 사이에 데이터를 유지하기 위한 **state 변수**
2. 변수를 업데이트하고 React가 컴포넌트를 다시 렌더링하도록 촉발하는 **state 설정자(setter) 함수)**

## State 변수 추가하기

```javascript
import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  function handleCount() {
    setCount(count + 1);
  }

  return (
    <>
      <h2>{count}</h2>
      <button onClick={handleCount}>+</button>
    </>
  );
}
```

### 훅(Hook)

React에서는 "use"로 시작하는 함수를 훅(Hook)이라고 부른다. Hook은 React가 렌더링 중일 때만 사용할 수 있는 특별한 함수이다. 이를 통해 다양한 React 기능을 연결할 수 있다. state는 이러한 기능 중 하나일 뿐이다.

- 훅은 컴포넌트의 최상위 레벨(최상위 컴포넌트 아님) 또는 커스텀 훅에서만 호출할 수 있다.
- 조건문, 반복문 또는 기타 중첩된 함수 내부에서는 훅을 호출할 수 없다.

## useState 까보기

```javascript
const [count, setCount] = useState(0);
```

컴포넌트가 렌더링될 때마다 useState는 두 개의 값을 포함하는 배열을 제공한다.

1. 저장한 값을 가진 state 변수(count)
2. state 변수를 업데이트하고 React가 컴포넌트를 다시 렌더링하도록 촉발할 수 있는 state 설정자(setter) 함수(setCount)

실제 작동 방식은 다음과 같다.

1. 컴포넌트가 처음 렌더링된다. count의 초기값으로 0을 useState에 전달했으므로 `[0, setCount]`가 반환된다. React는 0을 최신 state 값으로 기억한다.
2. state를 업데이트한다. 사용자가 버튼을 클릭하면 setCount(count+1)을 호출한다. React는 이제 count가 1임을 기억하고 다음 렌더링을 촉발한다.
3. 컴포넌트가 두 번째로 렌더링된다. React는 여전히 useState(0)을 보지만, count가 1로 설정한 것을 기억하고 있기 때문에, 이번에는 `[1, setCount]`를 반환한다.

## State is isolated and private

- state는 컴포넌트 인스턴스에 지역적이다.
  - 즉, 동일한 컴포넌트 2개를 렌더링하면 각 사본은 완전히 격리된 state를 갖게 된다.
  - 이 중 하나를 변경해도 다른 컴포넌트에는 영향을 미치지 않는다.
- props와 달리 state는 이를 선언하는 컴포넌트 외에는 완전히 비공개이며, 부모 컴포넌트는 이를 변경할수 없다!
- 따라서 다른 컴포넌트에 영향을 주지 않고 state를 추가하거나 제거할 수

## useState 작동 방식

컴포넌트 최상위 레벨에서 호출되는 useState는 어떤 state 변수를 참조하는지에 대한 정보를 받지 않는다. useState에 전달되는 식별자가 없는데 어떤 state 변수를 반환하는지 어떻게 알 수 있을까?

훅은 컴포넌트 렌더링에서 안정적인, useState 호출 순서에 의존한다. "최상위 수준에서만 훅 호출" 규칙에 따르면, 훅은 항상 같은 순서로 호출되기 때문에 실제로 잘 작동한다.

내부적으로 React는 모든 컴포넌트에 대해 한 쌍의 state 배열을 가진다. 또한 렌더링 전에 0으로 설정된 현재 배열 인덱스를 유지한다. useState를 호출할 때마다 React는 다음 state 쌍을 제공하고 인덱스를 증가시킨다.

```javascript
let componentHooks = [];
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++;
    return pair;
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = [initialState, setState];

  function setState(nextState) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair[0] = nextState;
    updateDOM();
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}

export function App() {
  const [count, setCount] = useState(0);

  function handleCount() {
    setCount(count + 1);
  }

  return (
    <>
      <h2>{count}</h2>
      <button onClick={handleCount}>+</button>
    </>
  );
}
```

- useState 훅의 간소화된 모델이다.

## 출처

- [Docs: State](https://react-ko.dev/learn/state-a-components-memory)
