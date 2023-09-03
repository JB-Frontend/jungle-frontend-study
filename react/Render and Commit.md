# Render and Commit

> 렌더링하고 커밋하기

컴포넌트를 화면에 표시하기 이전에 React에서 렌더링을 해야 합니다.  
해당 과정의 단계를 이해하면 코드가 어떻게 실행되는지 이해할 수 있고 React 렌더링 동작에 관해 설명하는데 도움이 됩니다.

### 학습 내용

1. React에서 렌더링의 의미
2. React가 컴포넌트를 언제, 왜 렌더링 하는지
3. 화면에 컴포넌트를 표시하는 단계
4. 렌더링이 항상 DOM 업데이트를 하지 않는 이유

<br>

주방에서 요리사가 컴포넌트를 재료로 맛있는 요리를 한다고 상상해봅시다!  
이 시나리오에서 React는 고객들의 요청을 받고 주문을 가져오는 웨이터입니다.  
이 과정에는 UI를 요청하고 제공하는 세 가지 단계가 있습니다.

**1단계** : 렌더링 **촉발** (손님의 주문을 주방으로 전달)  
**2단계** : 컴포넌트 **렌더링** (주방에서 주문 받기)  
**3단계** : DOM에 **커밋** (테이블에 주문한 요리 내놓기)

<br>

## Step 1: Trigger a render

> 렌더링을 촉발시킵니다.

컴포넌트 렌더링이 일어나는 데에는 두 가지 이유가 있습니다:

- 컴포넌트의 **첫 렌더링인 경우**
- 컴포넌트의 **state**(또는 상위 요소 중 하나)가 업데이트된 경우

### 첫 렌더링

앱을 시작하기 위해서는 첫 렌더링을 촉발시켜야 합니다.  
대상 DOM 노드로 `createRoot`를 호출한 다음 컴포넌트로 `render` 메서드를 호출하면 됩니다.

```JavaScript
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

## state가 업데이트되면 리렌더링

컴포넌트가 처음 렌더링되면 **`set` (설정자) 함수**로 state를 업데이트하여 추가 렌더링을 촉발시킬 수 있습니다.  
컴포넌트의 state를 업데이트하면 자동으로 렌더링이 대기열에 추가됩니다.  
(이것은 식당에서 손님이 첫 주문 이후에 갈증이 나거나 배고파져서 차, 디저트 등을 추가로 주문하는 모습으로 상상해 볼 수 있습니다.)

<br>

## Step 2: React renders your components

> React가 컴포넌트를 렌더링합니다

렌더링을 촉발시키면, React는 컴포넌트를 호출하여 화면에 표시할 내용을 파악합니다.  
“렌더링”은 React에서 컴포넌트를 호출하는 것입니다.

- 첫 렌더링에서 React는 루트 컴포넌트를 호출합니다.
- 이후 렌더링에서 React는 state 업데이트에 의해 렌더링이 발동된 함수 컴포넌트를 호출합니다.

이 과정은 재귀적입니다: 업데이트된 컴포넌트가 다른 컴포넌트를 반환하면 React는 다음으로 해당 컴포넌트를 렌더링하고  
해당 컴포넌트도 컴포넌트를 반환하면 반환된 컴포넌트를 다음에 렌더링하는 방식입니다.  
중첩된 컴포넌트가 더 이상 없고 React가 화면에 표시되어야 하는 내용을 정확히 알 때까지 이 단계는 계속됩니다.

다음 예제에서 React는 `Gallery()`와 `Image()`를 여러 번 호출합니다:

```JavaScript
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img src="https://i.imgur.com/ZF6s192.jpg"/>
  );
}
```

- 첫 렌더링을 하는 동안 React는 `<section>`, `<h1>` 그리고 3개의 `<img>` 태그에 대한 DOM 노드를 생성합니다.
- 리렌더링하는 동안 React는 이전 렌더링 이후 변경된 속성을 계산합니다. 다음 단계인 커밋 단계까지는 해당 정보로 아무런 작업도 수행하지 않습니다.

<br>

## Step 3: React commits changes to the DOM

> React가 DOM에 변경사항을 커밋

컴포넌트를 렌더링(호출)한 후 React는 DOM을 수정합니다.

- **초기 렌더링의 경우** React는 `appendChild()` DOM API를 사용하여 생성한 모든 DOM 노드를 화면에 표시합니다.
- **리렌더링의 경우** React는 필요한 최소한의 작업(렌더링하는 동안 계산된 것!)을 적용하여 DOM이 최신 렌더링 출력과 일치하도록 합니다

<br>

**React는 렌더링 간에 차이가 있는 경우에만 DOM 노드를 변경합니다.**  
예를 들어, 매초 부모로부터 전달된 다른 props로 다시 렌더링하는 컴포넌트가 있습니다.  
`<input>`에 텍스트를 입력하여 value를 업데이트 하지만 컴포넌트가 리렌더링될 때 텍스트가 사라지지 않습니다.

```javascript
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

마지막 단계에서 React가 `<h1>`의 내용만 새로운 time으로 업데이트하기 때문입니다.  
`<input>`이 JSX에서 이전과 같은 위치로 확인되므로 React는 `<input>` 또는 value를 건드리지 않습니다!

<br>

## 요약

- React 앱의 모든 화면 업데이트는 세 단계로 이루어집니다.

  1. 촉발
  2. 렌더링
  3. 커밋

- 렌더링 결과가 이전과 같으면 React는 DOM을 건드리지 않습니다.

- Strict Mode를 사용하여 컴포넌트에서 실수를 찾을 수 있습니다.
