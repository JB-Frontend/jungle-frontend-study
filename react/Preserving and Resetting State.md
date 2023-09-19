# Preserving and REsetting State
state는 컴포넌트 간에 격리된다. React는 UI 트리에서 어떤 컴포넌트가 어떤 state에 속하는지를 추적한다. state를 언제 보존하고 언제 초기화할지를 제어할 수 있다.  

## The UI tree
React는 트리 구조를 사용하여 사용자가 만든 UI를 관리하고 모델링한다.  
React는 JSX로부터 UI 트리를 만들고 React DOM은 해당 UI 트리와 일치하도록 브라우저 DOM 엘리먼트를 업데이트한다.
![Alt text](./image/PreservingAndREsettingState_1.png)

## State is tied to a position in the tree
state는 트리의 한 위치에 묶인다.  
state는 컴포넌트 내부에 존재한다고 생각할 수 있지만 실제로는 React 내부에서 유지된다.  
React는 UI 트리에서 해당 컴포넌트가 어디에 위치하는지에 따라 보유하고 있는 각 state를 올바른 컴포넌트와 연결한다.

```js
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
![Alt text](./image/PreservingAndREsettingState_2.png)
`<Counter />` JSX 태그가 하나만 있지만 두 개의 다른 위치에서 렌더링 된다. 따라서 React에서 화면의 각 컴포넌트는 완전히 분리된 state를 갖는다.  
  

```js
<Counter />
{showB && <Counter />} 
```
![Alt text](./image/PreservingAndREsettingState_7.png)
두 번째 counter 렌더링을 중지하는 순간 컴포넌트가 제거되기 때문에 state가 완전히 사라진다.
![Alt text](./image/PreservingAndREsettingState_3.png)
두 번째 counter 렌더링을 다시 실행하면 `count = 0`인 상태로 state가 초기화되어 렌더링 된다.  

## Same component at the same position preserves state
동일한 위치의 동일한 컴포넌트는 state를 유지합니다.
```js
{isFancy ? (
  <Counter isFancy={true} /> 
) : (
  <Counter isFancy={false} /> 
)}
```
![Alt text](./image/PreservingAndREsettingState_4.png)
체크박스를 선택하거나 선택 취소해도 카운터 state는 재설정되지 않습니다. `isFancy`가 `true`이든 `false`이든, 루트 `App` 컴포넌트에서 반환된 `div`의 첫 번째 자식에는 항상 `<Counter />`가 있다.

## Different components at the same position reset state
동일한 위치의 다른 컴포넌트는 state를 초기화한다.  
```js
{isFancy ? (
  <div>
    <Counter isFancy={true} /> 
  </div>
) : (
  <section>
    <Counter isFancy={false} />
  </section>
)}
```
![Alt text](./image/PreservingAndREsettingState_5.png)
![Alt text](./image/PreservingAndREsettingState_6.png)
동일한 위치여도 다른 `<div>`에서 `<section>`으로 태그가 바뀌었기 때문에 state가 초기화된다.  
즉, 리렌더링 사이에 state를 유지하려면 트리의 구조가 일치해야 한다. 구조가 다르면 React는 트리에서 컴포넌트를 제거할 때 state를 파괴하기 때문이다.