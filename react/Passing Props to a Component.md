# Passing Props to a Component

## 학습 내용

- 컴포넌트에 props를 전달하는 방법
- 컴포넌트에서 props를 읽는 방법
- props의 기본값을 지정하는 방법
- 컴포넌트에 JSX를 전달하는 방법
- 시간에 따라 props가 변하는 방식

## Props란?

- 'properties'의 줄임말
- React 컴포넌트 간에 데이터를 전달하는 방법
- 부모 컴포넌트에서 자식 컴포넌트로 데이터를 넘겨줄 때 사용된다.
- Read Only
- HTML 속성(Attribute)을 생각나게 할 수도 있지만, 객체, 배열, 함수를 포함한 모든 JS값을 전달할 수 있다.
- props를 사용하면 부모 컴포넌트와 자식 컴포넌트를 독립적으로 생각할 수 있다.

## 컴포넌트에 props 전달하기

```js
export function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
  );
}
```

> 위에서 person에는 object 타입의 값을 props로 전달하고 있다.

## 자식 컴포넌트 내부에서 props 읽기

```js
export function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
// 또는
export function Avatar(props) {
  let person = props.person;
  let size = props.size;
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

- 보통 전체 props 자체를 요구되는 경우는 없어서, 개별 props로 구조분해할당(destructure)한다.

## props의 기본값(Default) 지정하기

- 값이 지정되지 않았을 때, props에 기본값(Default)을 줄 수 있다.
- 기본값은 size props가 전달되지 않았거나 `size={undefined}` 로 전달될 때 사용된다.
- 그러나 `size={null}` 또는 `size={0}` 으로 전달되면, 기본값은 사용되지 않는다.

```js
export function Avatar({ person, size = 100 }) {
  // ...
}
```

## JSX spread 문법으로 props 전달하기

```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

때때로 전달되는 props들은 반복적이다. 반복적인 코드는 가독성을 높일 수 있지만, 떄로는 간결함이 중요할 때도 있다. 어떤 컴포넌트는 전달받은 모든 props를 자식 컴포넌트에게 전달한다. 이런 경우 보다 간결하게, JSX의 spread 문법을 사용하는 것이 합리적일 수 있다.

```
// spread 사용
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

이렇게 하면 모든 props를 나열하지 않고 전달할 수 있다. 그러나 spread 문법을 모든 컴포넌트에 적용하는 것은 좋지 않다.

## children을 JSX로 전달하기

JSX 태그 내에 콘텐츠를 중첩하면, 부모 컴포넌트는 해당 컨텐츠를 children이라는 props로 받게 된다. 이 때, \<Card>는 children 내부에서 무엇이 렌더링되는지 알 필요가 없다!

```js
import Avatar from "./Avatar.js";

function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}
```

## props가 변하는 방식

props는 항상 고정되어 있지 않다. 부모 컴포넌트에서 전달되는 값이 바뀔 때마다 해당 props는 새로운 값을 갖게 된다. props 값이 바뀔 때마다, React는 자식 컴포넌트를 다시 렌더링한다. 이때 자식 컴포넌트는 새로운 props 값을 사용하여 업데이트된다.

> 1. **부모 컴포넌트의 상태나 속성이 변경될 때:** 컴포넌트에 전달되는 `props` 값이 부모 컴포넌트의 상태(`state`)나 속성(`props`)에 의존적일 때, 부모 컴포넌트의 해당 상태나 속성이 바뀌면 자식 컴포넌트로 전달되는 `props` 또한 바뀝니다.
>
> 2. **부모 컴포넌트 내에서 조건에 따라 다른 값을 전달할 때:** 예를 들어, 조건부 렌더링을 사용하여 특정 조건에 따라 다른 값을 `props`로 전달하는 경우, 해당 조건이 바뀌면 `props` 값도 바뀝니다.
>
> 3. **부모 컴포넌트가 리렌더링될 때:** 부모 컴포넌트가 리렌더링되는 경우 (상태나 속성 변경, 부모 컴포넌트 내의 `forceUpdate` 호출 등의 이유로), 자식 컴포넌트에 전달되는 `props` 값이 바뀌었다면, 해당 `props`는 새로운 값을 갖게 됩니다.

props를 불변(Immutable)으로, 컴포넌트가 props를 변경해야 하는 경우 부모 컴포넌트에 다른 props, 즉 새로운 객체를 전달하도록 "요청"해야 한다. 그러면 이전의 props는 버려지고(참조를 끊는다), 결국 JavaScript 엔진은 기존 props가 차지했던 메모리를 회수(가비지 컬렉팅)하게 된다.

props를 전달받은 컴포넌트에서 props를 직접 변경하지 말자. 색을 바꾸는 등 사용자 입력에 반응해야 하는 경우에는 state를 사용하자.
