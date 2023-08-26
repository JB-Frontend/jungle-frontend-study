# Writing Markup with JSX

> JSX로 마크업 작성하기
> 

*JSX*는 JavaScript를 확장한 문법으로, JavaScript 파일 안에 HTML과 유사한 마크업을 작성할 수 있도록 해줍니다. 컴포넌트를 작성하는 다른 방법도 있지만, 대부분의 React개발자는 JSX의 간결함을 선호하며 대부분의 코드베이스에서 JSX를 사용합니다.

<aside>
💡 we will learn

- React가 마크업과 렌더링 로직을 같이 사용하는 이유
- JSX와 HTML의 차이점
- JSX로 정보를 보여주는 방법
</aside>

## **JSX: Putting markup into JavaScript
(JSX: JavaScript에 마크업 넣기)**

웹은 HTML, CSS, JavaScript를 기반으로 만들어져왔습니다. 수년 동안 웹 개발자들은 HTML로 컨텐츠를, CSS로 디자인을, 로직은 JavaScript로 작성해왔습니다. 보통은 각각 분리된 파일로 관리를 합니다.
페이지의 로직이 JavaScript안에서 분리되어 동작하는 동안, HTML 안에서는 컨텐츠가 마크업 되었습니다.

<aside>
💡 react에서 렌더링 로직과 마크업이 같은 위치의 컴포넌트에 함께 있는 이유
웹이 인터랙티브해지면서 로직이 컨텐츠를 결정하는 경우가 많아졌기 때문에 javascript가 HTML을 담당하게 되었다.

</aside>

> 렌더링 로직과 마크업이 함께 존재한다면, 모든 edit 상황에서 서로 동기화된 상태를 유지할 수 있다.
반대로 서로 관련이 없는 항목은 분리되어 개별적으로 변경하는 것이 더 안전하다.
> 

각 React 컴포넌트는 React가 브라우저에 마크업을 렌더링할 수 있는 JavaScript 함수입니다.
React 컴포넌트는 `JSX`라는 구문 확장자를 사용하여 해당되는 마크업을 표현합니다.
`JSX`는 HTML과 비슷해보이지만 조금 더 엄격하며 동적으로 정보를 표시할 수 있습니다.
JSX를 이해하는 가장 좋은 방법은 HTML마크업을 JSX마크업으로 변환해보는 것입니다.
👉 [html-to-jsx](https://transform.tools/html-to-jsx)

<aside>
💡 JSX와 React는 서로 다른 별개의 개념입니다. 종종 함께 사용되기도 하지만 [독립적으로](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) 사용할 수도 있습니다. JSX는 구문 확장이고, React는 JavaScript 라이브러리입니다.

</aside>

## **Converting HTML to JSX (HTML을 JSX로 변환하기)**

```jsx
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```

위와 같은 HTML 코드를 컴포넌트로 변경

```jsx
export default function TodoList() {
  return (
    // ???
  )
}
```

JSX는 HTML보다 더 엄격한 규칙이 있기 때문에 HTML 코드를 그대로 복사한다면 동작하지 않는다.

`⚠️ 대부분의 경우 React의 오류 메세지는 문제 발생 원인을 찾는데 도움이 된다.`

## **The Rules of JSX (JSX 규칙)**

### **1. Return a single root element (단일 루트 엘리먼트 반환)**

> 컴포넌트에서 여러 엘리먼트를 반환하려면, **하나의 부모 태그로 감싸야한다.**
> 

<aside>
💡 왜 JSX태그를 하나로 감싸야 할까?
JSX는 HTML처럼 보이지만 내부적으로는 일반 JavaScript 객체로 변환된다.
함수에서 두 개의 객체를 배열로 wrapping하지 않고는 return할 수 없으므로,
또 다른 태그나 Fragment로 감싸지 않으면 두 개의 JSX태그를 반환할 수 없다.

</aside>

```jsx
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
  </ul>
</>
```

`<> ... </>`를 사용하여 하나의 태그로 감싸준다.

<aside>
💡 [Fragment](https://react-ko.dev/reference/react/Fragment)  `<>…</>`
Fragment는 브라우저상의 HTML 트리 구조에서 흔적을 남기지 않고(아무 의미없이) 그룹화해주는 역할을 한다.

[Deep dive in Fragment ](https://www.notion.so/Deep-dive-in-Fragment-d2562e02cd9542c0bacef284efa57508?pvs=21)

</aside>

### **2. Close all the tags (모든 태그를 닫자)**

> JSX에서는 태그를 명시적으로 닫아야 합니다.
`<img>`태그처럼 자체적으로 닫는 태그도 반드시 `<img />`로 작성해야하며,
`<li>`oranges와 같은 래핑 태그 역시 `<li>oranges</li>`형태로 작성해야 합니다.
> 

```jsx
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

### **3. camelCase ~~all~~ most of the things! (대부분이 카멜 케이스이다!)**

> JSX는 JavaScript로 바뀌고 JSX로 작성된 attribute는 JavaScript 객체의 키가 됩니다.
종종 컴포넌트 안에서 attribute를 변수로 읽고 싶은 경우가 있을 것입니다.
하지만 JavaScript에는 변수명에 제한이 있습니다. 예를 들어, 변수명에는 대시를 포함하거나 `class`처럼 예약어를 사용할 수 없습니다.
이것이 React에서 많은 HTML과 SVG attribute가 camelCase로 작성되는 이유입니다.
예를 들어, `stroke-width` 대신 `strokeWidth`을 사용합니다. `class`는 예약어이므로, React에서는 대신 해당 [DOM 속성](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)의 이름을 따서 `className`을 씁니다:
> 

```jsx
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

> [모든 attribute는 React DOM엘리먼트에서](https://react-ko.dev/reference/react-dom/components/common) 확인할 수 있다.
> 

⚠️ `[aria-*](https://developer.mozilla.org/docs/Web/Accessibility/ARIA)` 과 `[data-*](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes)`의 attribute는 HTML에서와 동일하게 대시를 사용하여 작성합니다.

최종 코드는 이렇게 된다.

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
```

## Recap

- React 컴포넌트는 서로 관련이 있는 마크업과 렌더링 로직을 함께 그룹화합니다.
- JSX는 HTML과 비슷하지만 몇 가지 차이점이 있습니다. 필요한 경우 [변환기](https://transform.tools/html-to-jsx)를 사용할 수 있습니다.
- 오류 메세지는 종종 마크업을 수정할 수 있도록 올바른 방향을 알려줍니다.

---

## Challenge

> **HTML to JSX**
> 

```jsx
export default function Bio() {
  return (
    <>
	    <div class="intro">
	      <h1>Welcome to my website!</h1>
	    </div>
	    <p class="summary">
	      You can find my thoughts here.
	      <br/><br/>
	      <b>And <i>pictures</i></b> of scientists!
	    </p>
    </>
  );
}
```