# JavaScript in JSX with Curly Braces

<aside>
💡 JSX를 사용하면 JavaScript 파일 내에 HTML과 유사한 마크업을 작성하여 렌더링 로직과 콘텐츠를 같은 위치에 유지할 수 있습니다.
때로는 마크업 안에 약간의 JavaScript 로직을 추가하거나 동적 프로퍼티를 참조하고 싶을 때가 있습니다.
이 경우 JSX에서 중괄호(`{}`)를 사용하여 JavaScript로 창을 열 수 있습니다.

</aside>

<aside>
💡 we will learn

- 따옴표로 문자열을 전달하는 방법
- 중괄호를 사용하여 JSX 내에서 JavaScript 변수를 참조하는 방법
- 중괄호를 사용하여 JSX 내에서 JavaScript 함수를 호출하는 방법
- 중괄호를 사용하여 JSX 내에서 JavaScript 객체를 사용하는 방법
</aside>

## **Passing strings with quotes (따옴표로 문자열 전달하기)**

JSX에 문자열 attribute를 전달하려면, 따옴표로 묶습니다.

```jsx
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

하지만 `src` 또는 `alt` 를 동적으로 지정하려면, `"` 및 `"`를 `{` 및 `}`로 대체하여 JavaScript의 값을 사용할 수 있습니다:

```jsx
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

## **Using curly braces: A window into the JavaScript world
(중괄호 사용하기: JavaScript 세계를 들여다보는 창)**

<aside>
💡 JSX에서는 중괄호 `{ }` 안에서 JavaScript를 사용할 수 있다

</aside>

```jsx
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

중괄호 사이에는 `formatDate()`와 같은 함수 호출을 포함하여 모든 JavaScript 표현식이 작동합니다:

```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```

### **Where to use curly braces (중괄호 사용 위치)**

<aside>
💡 JSX 내부에서는 중괄호 (`{}`)를 두 가지 방법으로만 사용이 가능하다.

</aside>

1. JSX 태그 안에 직접 **텍스트**로 사용: `<h1>{name}'s To Do List</h1>` 는 작동하지만 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 는 작동하지 않습니다.
2. `=`기호 바로 뒤에 오는 **속성**: `src={avatar}`는 아바타 변수를 읽지만,
`src="{avatar}"`는 문자열 `"{avatar}"`를 전달합니다.

## **Using “double curlies”: CSS and other objects in JSX
(“이중 중괄호” 사용: JSX 내에서의 CSS 및 다른 객체)**

<aside>
💡 SX에서 `{{` 와 `}}`를 볼 때, 이는 JSX 중괄호 내부의 객체일 뿐이다.

</aside>

JSX 안에서 JS Object를 전달하려면 중괄호로 Object를 감싸야하기 때문에 이중 중괄호가 된다.

`person={{ name: "Hedy Lamarr", inventions: 5 }}`

JSX의 인라인 CSS 스타일을 적용하는 것에서도 확인할 수 있다.

```jsx
export default function TodoList() {
  return (
		// JSX에서의 인라인 style 프로퍼티는 camelCase로 작성해야 한다. background-color (x)
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

## **More fun with JavaScript objects and curly braces
(JavaScript 객체와 중괄호로 더 재미있게 즐기기???)**

<aside>
💡 JSX는 JavaScript를 사용하여 데이터와 로직을 구성할 수 있기 때문에
템플릿 언어로서 최소한의 기능을 제공합니다.

</aside>

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

객체 안에 객체가 있는 이중 객체 구조이다.

`person`을 사용하여 JSX코드를 아래와 같이 구성할 수 있다.

```jsx
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
</div>
```

위의 코드는 아래와 같은 의미 이다.

```jsx
<div style={{ backgroundColor: 'black', color: 'pink' }}>
  <h1>Gregorio Y. Zara's Todos</h1>
</div>
```

---

## Recap

- 따옴표 안의 JSX 속성은 문자열로 전달됩니다.
- 중괄호를 사용하면 JavaScript 로직과 변수를 마크업으로 가져올 수 있습니다.
- 중괄호는 JSX 태그 콘텐츠 내부 또는 속성의 `=` 바로 뒤에서 작동합니다.
- `{{` 와 `}}` 는 특별한 구문이 아니라 JSX 중괄호 안에 들어 있는 JavaScript 객체입니다.

---

## Challenge

- fix the mistake
    
    ```jsx
    const person = {
      name: 'Gregorio Y. Zara',
      theme: {
        backgroundColor: 'black',
        color: 'pink'
      }
    };
    
    export default function TodoList() {
      return (
        <div style={person.theme}>
          <h1>{person.name}'s Todos</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/7vQD0fPs.jpg"
            alt="Gregorio Y. Zara"
          />
          <ul>
            <li>Improve the videophone</li>
            <li>Prepare aeronautics lectures</li>
            <li>Work on the alcohol-fuelled engine</li>
          </ul>
        </div>
      );
    }
    ```
    
- extract information into an object
    
    ```jsx
    const person = {
      name: 'Gregorio Y. Zara',
      theme: {
        backgroundColor: 'black',
        color: 'pink'
      },
      imgUrl: "https://i.imgur.com/7vQD0fPs.jpg"
    };
    
    export default function TodoList() {
      return (
        <div style={person.theme}>
          <h1>{person.name}'s Todos</h1>
          <img
            className="avatar"
            src={person.imgUrl}
            alt="Gregorio Y. Zara"
          />
          <ul>
            <li>Improve the videophone</li>
            <li>Prepare aeronautics lectures</li>
            <li>Work on the alcohol-fuelled engine</li>
          </ul>
        </div>
      );
    }
    ```
    
- write an expression inside JSX curly braces
    
    ```jsx
    const baseUrl = 'https://i.imgur.com/';
    const person = {
      name: 'Gregorio Y. Zara',
      imageId: '7vQD0fP',
      imageSize: 'b',
      theme: {
        backgroundColor: 'black',
        color: 'pink'
      }
    };
    
    export default function TodoList() {
      return (
        <div style={person.theme}>
          <h1>{person.name}'s Todos</h1>
          <img
            className="avatar"
            src= {`${baseUrl}${person.imageId}${person.imageSize}.jpg`}
            alt={person.name}
          />
          <ul>
            <li>Improve the videophone</li>
            <li>Prepare aeronautics lectures</li>
            <li>Work on the alcohol-fuelled engine</li>
          </ul>
        </div>
      );
    }
    ```