# Responding to Events

> 이벤트 응답하기

React를 사용하면 JSX에 이벤트 핸들러를 추가할 수 있습니다.  
이벤트 핸들러는 click, hover, input의 focus 등과 같은 상호작용에 반응하여 발생하는 자체 함수입니다.

### 학습 내용

1. 이벤트 핸들러를 작성하는 다양한 방법
2. 부모 컴포넌트로부터 이벤트 핸들링 로직을 전달하는 방법
3. 이벤트가 전파되는 방식과 중지하는 방법

<br>

## Adding event handlers

> 이벤트 핸들러 추가하기

이벤트 핸들러를 추가하려면 먼저 함수를 정의한 다음 이를 적절한 JSX 태그에 **prop**으로 전달합니다.  
예를 들어, 아래에 아직 아무 작업도 수행하지 않는 버튼이 있습니다:

```javascript
export default function Button() {
  return <button>I don't do anything</button>;
}
```

<br>

다음의 세 단계를 거쳐 사용자가 클릭할 때 메시지를 표시하도록 설정할 수 있습니다.

1. `Button`컴포넌트 안에 `handleClick`이라는 함수를 선언합니다.
2. 해당 함수 내부의 로직을 구현합니다(`alert`을 사용하여 메시지 표시).
3. JSX의 `<button>`에 `onClick={handleClick}`를 추가합니다.

```javascript
export default function Button() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

<br>

`handleClick` 함수를 정의한 다음 이를 `<button>`에 **prop으로 전달**했습니다. `handleClick`은 **이벤트 핸들러**입니다.

이벤트 핸들러 함수는:

- 일반적으로 컴포넌트 안에 정의됩니다.
- `handle`로 시작하는 이름 뒤에 이벤트 이름이 오도록 합니다.

그리고 관례상 이벤트 핸들러의 이름은 `handle` 뒤에 이벤트 이름을 붙이는 것이 일반적입니다.  
흔히 `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}`등을 볼 수 있습니다.

<br>

또는 JSX에서 인라인으로 이벤트 핸들러를 정의할 수도 있습니다:

```javascript
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

더 간결하게 화살표 함수를 사용할 수도 있습니다:

```javascript
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

<br>

## **주의사항** 🚨

이벤트 핸들러에 전달되는 함수는 호출하는 게 아니라 전달되어야 합니다.  
예를 들어:

| 함수 전달 (올바름)                      | 함수 호출 (잘못됨)                |
| :-------------------------------------- | :-------------------------------- |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |

<br>

아래와 같은 인라인 코드를 전달하면 클릭시 실행되지 않고, 컴포넌트가 렌더링될 때마다 실행됩니다:

```javascript
<button onClick={alert('You clicked me!')}>
```

이벤트 핸들러를 인라인으로 정의하려면 다음과 같이 익명 함수로 감싸주세요:

```javascript
<button onClick={() => alert('You clicked me!')}>
```

<br>

## Passing event handlers as props

> 이벤트 핸들러를 props로 전달하기

가끔 부모 컴포넌트가 자식의 이벤트 핸들러를 지정하고 싶을 때가 있습니다.  
이렇게 하기 위해서는, 컴포넌트가 부모로부터 받는 prop을 이벤트 핸들러로 다음과 같이 전달합니다:

```javascript
export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
    </div>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return <Button onClick={handlePlayClick}>Play "{movieName}"</Button>;
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
```

여기서 `Toolbar` 컴포넌트는 `PlayButton`을 렌더링합니다.  
`PlayButton`은 `handlePlayClick`을 `onClick` prop으로 내부의 `Button`에 전달합니다.

마지막으로 `Button` 컴포넌트는 `onClick`이라는 prop을 받습니다.  
해당 prop을 브라우저의 빌트인 `<button>`으로 직접 전달하며, `onClick={onClick}`을 사용합니다.  
이는 클릭 시 전달된 함수를 호출하도록 React에 지시합니다.

<br>

## Naming event handler props

> 이벤트 핸들러 props 이름 정하기

자체 컴포넌트를 빌드할 때는 이벤트 핸들러 prop의 이름을 원하는 방식으로 지정할 수 있습니다.  
관례상 이벤트 핸들러 props은 `on`으로 시작하고 그 뒤에 대문자가 와야 합니다.  
예를 들어, 아래 `Button` 컴포넌트의 `onClick` prop은 `onSmash`로 호출할 수 있습니다:

```javascript
function Button({ onSmash, children }) {
  return <button onClick={onSmash}>{children}</button>;
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert("Playing!")}>Play Movie</Button>
      <Button onSmash={() => alert("Uploading!")}>Upload Image</Button>
    </div>
  );
}
```

<br>

## Event propagation

> 이벤트 전파

이벤트 핸들러는 컴포넌트에 있을 수 있는 모든 하위 컴포넌트의 이벤트도 포착합니다.  
이벤트가 트리 위로 ‘버블’ 또는 ‘전파’되는 것을 이벤트가 발생한 곳에서 시작하여 트리 위로 올라간다고 합니다.

```JavaScript
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```

두 버튼 중 하나를 클릭하면 해당 버튼의 `onClick`이 먼저 실행되고 그다음에 부모 `<div>`의 `onClick`이 실행됩니다.  
따라서 두 개의 메시지가 나타납니다. 툴바 자체를 클릭하면 부모 `<div>`의 `onClick`만 실행됩니다.

<br>

## Stopping propagation

> 전파 중지하기

이벤트 핸들러는 **이벤트 객체**를 유일한 인수로 받습니다. 이것은 관례상 “event”를 의미하는 `e`라고 불립니다.  
이 객체를 사용하여 이벤트에 대한 정보를 읽을 수 있습니다.

해당 이벤트 객체를 사용하면 전파를 중지할 수도 있습니다.
이벤트가 상위 컴포넌트에 도달하지 못하도록 하려면 아래 `Button` 컴포넌트처럼 `e.stopPropagation()`을 호출해야 합니다:

```JavaScript
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

버튼을 클릭하면:

1. React는 `<button>`에 전달된 `onClick` 핸들러를 호출합니다.
2. `Button`에 정의된 이 핸들러는 다음을 수행합니다:
   - 이벤트가 더 이상 버블링되지 않도록 `e.stopPropagation()`을 호출합니다.
   - `Toolbar` 컴포넌트에서 전달된 props인 `onClick`함수를 호출합니다.
3. `Toolbar` 컴포넌트에 정의된 이 함수는 버튼 자체의 경고를 표시합니다.
4. 전파가 중지되었으므로 부모 `<div>`의 `onClick` 핸들러가 실행되지 않습니다.

<br>

## Preventing default behavior

> 기본 동작 방지

일부 브라우저 이벤트에는 연결된 기본 동작이 있습니다.  
예를 들어, `<form>` submit 이벤트는 내부의 버튼을 클릭할 때 발생하며  
기본적으로 전체 페이지를 다시 로드합니다:

```JavaScript
export default function Signup() {
  return (
    <form onSubmit={() => alert('Submitting!')}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

이벤트 객체에서 `e.preventDefault()`를 호출하여 이런 일이 발생하지 않도록 할 수 있습니다:

```JavaScript
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

<br>

`e.stopPropagation()`과 `e.preventDefault()`를 혼동하지 마세요.  
둘 다 유용하지만 서로 관련이 없습니다:

- `e.stopPropagation()`은 위 태그에 연결된 이벤트 핸들러의 실행을 중지합니다.
- `e.preventDefault()`는 해당 이벤트가 있는 몇 가지 이벤트에 대해 기본 브라우저 동작을 방지합니다.

<br>

Can event handlers have side effects?

> 이벤트 핸들러에 부작용이 생길 수 있나요?

물론입니다! 이벤트 핸들러는 부작용이 가장 많이 발생하는 곳입니다.

렌더링 함수와 달리 이벤트 핸들러는 순수할 필요가 없으므로 타이핑에 대한 응답으로 input 값을 변경하거나  
버튼 누름에 대한 응답으로 목록을 변경하는 등 무언가를 변경하기에 좋은 곳입니다.  
하지만 일부 정보를 변경하려면 먼저 정보를 저장할 방법이 필요합니다.  
React에서는 컴포넌트의 메모리인 state를 사용해 이 작업을 수행합니다.

<br>

## 요약

- `<button>`과 같은 요소에 함수를 prop으로 전달하여 이벤트를 처리할 수 있습니다.
- 이벤트 핸들러는 **호출이 아니라 전달**해야 합니다! `onClick={handleClick()}`이 아니라 `onClick={handleClick}`입니다.
- 이벤트 핸들러 함수를 개별적으로 또는 인라인으로 정의할 수 있습니다.
- 이벤트 핸들러는 컴포넌트 내부에 정의되므로 props에 액세스할 수 있습니다.
- 부모에서 이벤트 핸들러를 선언하고 이를 자식에게 prop으로 전달할 수 있습니다.
- 이름을 지정하여 이벤트 핸들러 prop을 직접 정의할 수 있습니다.

- 이벤트는 위쪽으로 전파됩니다. 이를 방지하려면 첫 번째 인수에 `e.stopPropagation()`을 호출하세요.
- 이벤트에 원치 않는 기본 브라우저 동작이 있을 수 있습니다. 이를 방지하려면 `e.preventDefault()`를 호출하세요.
- 자식 핸들러에서 이벤트 핸들러 prop을 명시적으로 호출하는 것은 전파에 대한 좋은 대안입니다.
