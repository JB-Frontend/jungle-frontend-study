## 객체 state 업데이트

### 학습 내용

- React state에서 객체를 올바르게 업데이트하는 방법
- 중첩된 객체를 변이하지 않고 업데이트하는 방법
- 불변성이란 무엇이며, 불변성을 깨뜨리지 않는 방법
- Immer로 객체 복사를 덜 반복적으로 만드는 방법

### 변이(mutation)란 무엇인가?

- mutation: 변이
- JavaScript에서 숫자/문자열/불리언은 원시(primitive) 타입이므로 변이할 수 없는(불변) "**읽기 전용**"이다.
- 그러나, 객체(Object) 자체의 내용을 변경하는 것은 가능하다.

```javascript
const [position, setPosition] = useState({ x: 0, y: 0 });
position.x = 5; // mutation, 리렌더링X
```

React에서 객체 state는 기술적으로는 변이할 수 있지만, 숫자/문자열/불리언과 같이 **불변하는 것처럼** 취급해야 한다. 객체를 직접 변이하는 대신, 객체를 교체해야 한다. 따라서 state에 넣는 모든 JavaScript 객체를 read-only(읽기 전용)으로 취급해야 한다.

```javascript
import { useState } from "react";
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  return (
    <div
      onPointerMove={(e) => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "red",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
}
```

위 코드에서 문제가 발생하는 부분은 `onPointerMove()`이다.

```javascript
onPointerMove = {e => {
 position.x = e.clientX;
 position.y = e.clientY;
}}
```

- 이전 렌더링에서 position에 할당된 객체를 수정한다.
- 그러나 state 설정자 함수(setPosition)을 사용하지 않으므로, React는 객체가 변이되었다는 사실을 알지 못하고 리렌더링이 발생하지 않는다.
- 따라서 실제로 리렌더링을 촉발하려면 새 객체를 생성하고 `setPosition()`에 전달해야 한다.

```javascript
onPointerMove = {e => {
 setPosition({
  x: e.clientX,
  y: e.clientY
 });
}}
```

### 지역 변이는 괜찮다

기존 객체의 state를 수정하는 것이 문제였기 때문에, "방금 생성한 새로운 객체"를 변이하는 것은 괜찮다! 방금 생성한 객체를 변경해도 다른 코드가 아직 참조하지 않는다. 이를 "지역 변이(local mutation)"라고 한다.

```javascript
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

### 전개(spread) 구문을 사용하여 객체 복사하기

위의 예제에서 position 객체를 항상 새로 만들었다. 그러나 종종 기존 데이터를 새로 만든 객체의 일부로 포함시키고 싶을 때가 있다. 예를 들어, form에 있는 하나의 필드만 업데이트하고 다른 모든 필드는 이전 값을 유지하고 싶을 수 있다.

![[Pasted image 20230910020139.png]]

```javascript
setPerson({
  firstName: e.target.value,
  lastName: person.lastName,
  email: person.email,
});
```

form의 필드 중 하나만 변경되므로, 기존 데이터도 복사해야 한다. 위처럼 모든 프로퍼티를 개별적으로 복사할 필요가 없도록 "객체 전개(object spread)" 구문을 사용할 수 있다. 모든 데이터를 객체에 그룹화하여 보관하기 편리하다!

```javascript
setPerson({
  ...person, // 이전 필드를 복사
  firstName: e.target.value, // firstName만 덮어씌운다!
});
```

#### 여러 필드에 단일 이벤트 핸들러 사용하기

```javascript
import { useState } from "react";

export default function Form() {
  const [person, setPerson] = useState({
    firstName: "Barbara",
    lastName: "Hepworth",
    email: "bhepworth@sculpture.com",
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value, // 동적 네이밍 프로퍼티
      // 세 개의 input 태그에 대해 단일 이벤트 핸들러를 사용
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input name="email" value={person.email} onChange={handleChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
  );
}
```

### 중첩된 객체 업데이트하기

그러나 spread 구문은 "얕은(shallow)" 구문으로, 한 단계 깊이만 복사한다. 속도는 빠르지만 중첩된 프로퍼티를 업데이트하려면 두 번 이상 사용해야 한다는 뜻이다.

```javascript
const [person, setPerson] = useState({
  name: "Niki de Saint Phalle",
  artwork: {
    title: "Blue Nana",
    city: "Hamburg",
    image: "https://i.imgur.com/Sd1AgUOm.jpg",
  },
});
```

위와 같은 중첩된 객체 구조에서 `person.artwork.city`를 업데이트하려면 다음과 같다.

```javascript
const nextArtwork = { ...person.artwork, city: "New Delhi" };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);

// 또는

setPerson({
  ...person, // Copy other fields
  artwork: {
    // but replace the artwork
    // 대체할 artwork를 제외한 다른 필드를 복사합니다.
    ...person.artwork, // with the same one
    city: "New Delhi", // but in New Delhi!
    // New Delhi'는 덮어씌운 채로 나머지 artwork 필드를 복사합니다!
  },
});
```

#### 그러나 객체는 실제로 "중첩"되지 않는다

"중첩"은 객체의 동작 방식을 고려해보자면 정확한 방식은 아니다. 코드가 실행될 때 "중첩된" 객체 같은 것은 존재하지 않는다. 실제로는 서로 다른 두 개의 객체를 보고 있는 것이다.

```javascript
let obj1 = {
  title: "Blue Nana",
  city: "Hamburg",
  image: "https://i.imgur.com/Sd1AgUOm.jpg",
};

let obj2 = {
  name: "Niki de Saint Phalle",
  artwork: obj1,
};
```

obj1은 obj2의 "내부"에 있지 않다. 예를 들어 obj3도 obj1을 "가리킬" 수 있다. 프로퍼티를 이용하여 서로를 "가리키는" 별도의 객체일 뿐이다.

```javascript
let obj3 = {
  name: "Copycat",
  artwork: obj1,
};
```

### Immer로 간결한 업데이트 로직 작성

객체 state가 깊게 중첩된 경우 **평평하게** 만드는 것을 고려할 수 있지만, state 구조를 변경하고 싶지 않다면 중첩된 spread 구문보다 더 간편한 방법을 사용할 수 있다.

- **Immer**
- 변이(mutation) 구문을 작성하더라도 자동으로 사본을 생성해주는 편리한 라이브러리이다.
- Immer를 사용하면 코드가 "(불변성의)규칙을 깨고" 객체를 변이하는 것처럼 보인다.

```javascript
updatePerson((draft) => {
  draft.artwork.city = "Lagos";
});
```

- 하지만 일반 변이와 달리, 이전 렌더링 시의 state를 덮어쓰지 않는다.

Immer 사용

> 1. npm install use-immer
> 2. `import { useState } from 'react';` 대신 `import { useImmer } from 'use-immer';`

```javascript
import { useImmer } from "use-immer";

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });

  function handleNameChange(e) {
    updatePerson((draft) => {
      draft.name = e.target.value; // 일반적인 변이(mutation)처럼 보인다.
    });
  }

  function handleTitleChange(e) {
    updatePerson((draft) => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson((draft) => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson((draft) => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input value={person.name} onChange={handleNameChange} />
      </label>
      <label>
        Title:
        <input value={person.artwork.title} onChange={handleTitleChange} />
      </label>
      <label>
        City:
        <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <label>
        Image:
        <input value={person.artwork.image} onChange={handleImageChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {" by "}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  );
}
```

```javascript
// useState
function handleTitleChange(e) {
  setPerson({
    ...person,
    artwork: {
      ...person.artwork,
      title: e.target.value,
    },
  });
}

// useImmer
function handleTitleChange(e) {
  updatePerson((draft) => {
    draft.artwork.title = e.target.value;
  });
}
```

이벤트 핸들러가 상당히 간결해진 것을 확인할 수 있다. state에 중첩이 있고 객체를 복사하는 코드가 반복되는 경우, Immer 라이브러리는 업데이트 핸들러를 간결하게 유지하는 데 좋은 방법이다.

### React에서 state 변이를 권장하지 않는 이유

#### 디버깅

setState가 아니라 state를 변이할 경우, 리렌더링이 발생하지 않기 때문에 console.log로 디버깅할 수가 없다.

#### 최적화

일반적인 React 최적화 전략은 "이전 props/state가 다음 props/state와 동일한 경우, 작업을 건너뛰는 것"에 의존한다. state를 변이하지 않으면 변경이 있었는지 확인하는 것이 매우 빠르다. 만약 `prevObj === obj`라면, 내부에 변경된 것이 없다는 것을 확신할 수 있다.

#### 새로운 기능

현재 개발 중인 새로운 React 기능은 state가 스냅샷처럼 취급되는 것에 의존한다.

#### 요구 사항 변경

실행 취소/다시 실행 구현, 변경 내역 표시, 사용자가 양식을 이전 값으로 재설정할 수 있도록 하는 것과 같은 일부 애플리케이션 기능은 아무것도 변이되지 않은 state에서 더 쉽게 수행할 수 있다. 과거의 state 복사본을 메모리에 보관하고 필요할 때 재사용할 수 있기 때문입니다. 변경 접근 방식으로 시작하면 나중에 이와 같은 기능을 추가하기 어려울 수 있다.

### 더 간단한 구현

React는 변이에 의존하지 않기 때문에 객체에 특별한 작업을 할 필요가 없다. 많은 “반응형” 솔루션처럼 프로퍼티를 가로채거나, 항상 프록시로 감싸거나, 초기화할 때 다른 작업을 할 필요가 없다. 이것이 바로 React를 사용하면 추가 성능이나 정확성의 함정 없이 아무리 큰 객체라도 state에 넣을 수 있는 이유이기도 하다.
