# Conditional Rendering

컴포넌트는 서로다른 조건에 따라 다른 것을 보여줘야 하는 경우가 자주 발생한다. **React**에서는 `if`문, `&&`, `? : ` 연산자 같은 JavaScript 문법을 사용해 조건부로 JSX를 렌더링 할 수 있다.

## If else

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```
![Alt text](./image/ConditionalRendering1.png)

## Conditionally returning nothing with `null`
```js
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```
![Alt text](./image/ConditionalRendering2.png)

`null`을 반환하여 화면에 아무것도 띄우지 않을 수 있다.  
하지만 이러한 방식은 정석적인 방식이 아니기 때문에 부모컴포넌트의 JSX에 컴포넌트를 조건부로 포함하거나 제외하는 경우가 더 많다.  

## Conditional (ternary) operator (? :)
```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```
위 코드에서 `return <li className="item">{name}</li>;` 이 부분이 중복되어서 나타나는 것을 확인할 수 있다. 이런 중복은 문제는 없지만 코드의 양이 많아질수록 코드 유지 관리를 어렵게 한다.
```js
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```
이렇게 3항 연산자를 사용하면 훨씬 간결한 코드로 같은 내용을 표현할 수 있다.
## Logical And operator (&&)
```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```
`&&` 연산자를 사용하여 표현할 수도 있다. 일반적으로 React 컴포넌트 내에서 조건이 참일 때 일부 JSX를 렌더링하거나 그러지 않으면 아무것도 렌더링하지 않으려 할 때 자주 사용되는 방식이다.  
  
### ※Pitfall
프로그래밍에서 숫자 `0`은 `false`를 의미하고 그 외 값은 `true`를 의미한다. 따라서 `messageCount && <p>New messages</p>` 를 사용하게 `messageCount === 0`일 때 아무것도 렌더링하지 않는다고 생각하지 쉽지만 실제로는 0을 불리언 타입이 아니라 숫자 자체로 인식하기 때문에 `0` 자체를 렌더링하게 됩니다.  
이 문제는 `messageCount > 0 && <p>New messages</p>`와 같이 비교연산자를 사용하거나 `!!messageCount && <p>New messages</p>`와 같이 이중부정을 사용하여 해결할 수 있다.
## Conditionally assigning JSX to a variable
```js
let itemContent = name;
if(isPacked){
  itemContent = name + " ✔"
}
<li className="item">
  {itemContent}
</li>
```
`if` 문을 사용하여 `isPacked`가 `true`면 JSX 표현식을 `itemContent`에 재할당 할 수 있다.  
`중괄호`로 변수를 반환된 JSX 트리에 삽입하여 이전에 계산된 표현식을 JSX 안에 중첩시킬 수 있다.