## 컴포넌트 순수성 유지

[Docs](https://react-ko.dev/learn/keeping-components-pure)

### 학습 내용

- 순수성이 무엇이고 그것이 버그를 방지하는 데에 어떻게 도움이 되는지
- 렌더링 단계에서 변경 사항을 제외함으로써 컴포넌트를 순수하게 유지하는 방법
- 컴포넌트에서 실수를 찾기 위해 Strict Mode를 사용하는 방법

## Purity: Components as formulas

> 순수성: 수식으로서의 컴포넌트

### Pure Function

컴퓨터 과학(특히 함수형 프로그래밍의 세계)에서 "순수 함수"는 다음과 같은 특징을 가진 함수이다.

- 동일한 입력에 대해 항상 동일한 출력을 반환한다.
  - 순수 함수는 주어진 입력에 따라 결과를 반환하는데, 이때 외부 상태나 데이터에 의존하지 않는다.
  - 따라서 동일한 입력값이 주어지면 항상 동일한 결과를 반환한다.
- 부수 효과(Side Effects)가 없다.
  - 순수 함수는 외부의 상태를 변경하거나, 함수 외부에서 관찰할 수 있는 효과를 발생시키지 않는다.
  - 예를 들어, 전역 변수의 값을 변경하거나, 파일 시스템에 데이터를 쓰는 작업, 화면에 출력하는 작업 등이 Side Effects에 해당한다.

```javascript
function double(number) {
  return 2 * number;
}
```

위의 JavaScript 함수 double()은 **순수 함수**이다. 3을 전달하면 언제나 6을 반환한다.

### 순수 함수의 장점

- 예측 가능성: 항상 동일한 결과를 반환하기 때문에 함수의 동작을 예측하기 쉽다.
- 테스트 용이성: 외부 상태에 의존하지 않기 때문에 테스트하기 쉽다.
- 병렬 처리 용이성: Side Effects가 없기 때문에 여러 쓰레드나 프로세스에서 안전하게 실행할 수 있다.

### React에서의 순수 함수

리액트에서 순수 함수는 컴포넌트 개발에 있어 중요한 개념 중 하나이다. 리액트 컨텍스트에서 순수 함수는 주로 두 가지 관점에서 사용된다.

1. 순수 함수형 컴포넌트

이러한 컴포넌트는 주어진 props에만 의존하며, 내부 상태(state)나 생명주기 메서드를 사용하지 않는 컴포넌트를 의미한다. 주어진 props에 따라 항상 동일한 결과를 렌더링하므로 예측하기 쉽고 테스트하기도 용이하다.

- 예:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

2. 순수 함수의 특성

리액트에서는 함수를 작성할 때도 순수 함수의 원칙을 따르는 것이 바람직하다. 이는 특히 상태 관리나 props 변화에 따른 렌더링 최적화에 큰 도움이 된다. 순수 함수의 특성은 다음과 같다.

- 동일 입력, 동일 출력
- Side Effects가 없다. => 함수 외부의 어떤 상태도 변경하지 않는다.

### React에서 순수 함수의 장점

- **성능 최적화**: React의 `shouldComponentUpdate`와 같은 생명주기 메서드나 `React.memo`를 사용하여 컴포넌트의 리렌더링을 최적화할 수 있다. 순수 함수는 동일한 입력에 대해 동일한 출력을 반환하기 때문에, 불필요한 리렌더링을 방지하는 데 도움이 된다.
- **코드의 명확성**: Side Effects가 없고, 상태 변경이 없는 함수는 디버깅하기 쉽고 이해하기도 편리하다.
- **재사용성**: 특정 상태나 Side Effects에 의존하지 않는 순수 함수는 재사용하기가 더 쉽다.

React는 이 개념을 중심으로 설계되었다. **React는 우리가 작성하는 모든 컴포넌트가 순수 함수라고 가정한다**. 즉, 우리가 작성하는 React 컴포넌트는 동일한 입력이 주어졌을 때 항상 동일한 JSX를 반환해야 한다!

## Side Effects: (un)intended consequences

> 사이드 이펙트(부수 효과)

React의 렌더링 프로세스는 항상 "순수"해야 한다. 컴포넌트는 오직 JSX를 반환해야 하며, 렌더링 전에 존재했던 객체나 변수를 변경해서는 안 된다. 이는 컴포넌트를 **불순(Impure)하게** 만들 수 있다.

다음은 이 규칙을 어기는 컴포넌트이다.

```javascript
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  // 나쁨: 기존 변수를 변경합니다!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
/* 출력
## Tea cup for guest #2
## Tea cup for guest #4
## Tea cup for guest #6
*/
```

이 컴포넌트는 외부에서 선언된 guest 변수를 읽고 쓰고 있다. 즉, 이 컴포넌트는 호출할 때마다 다른 JSX가 생성된다는 뜻이다. 게다가 다른 컴포넌트가 guest를 읽으면 렌더링된 시점에 따라 JSX도 다르게 생성된다. 예측할 수 없는 일이다.

guest를 prop으로 전달함으로써 이 컴포넌트를 고칠 수 있다.

```javascript
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
/* 출력
## Tea cup for guest #1
## Tea cup for guest #2
## Tea cup for guest #3
*/
```

이제 컴포넌트가 반환하는 JSX는 guest prop에만 의존하므로 "순수"하다.

일반적으로 컴포넌트가 특정 순서로 렌더링될 것이라고 기대해서는 안 된다. 각각의 컴포넌트가 앞에 호출되든 뒤에 호출되든 순서에 상관없이 항상 같은 결과를 나타내야 한다! 각 컴포넌트가 렌더링 중에 다른 컴포넌트와 조율하거나 의존하지 않게 해야한다.

## Local Mutation: Your component's little secret

> 지역 변이: 컴포넌트의 작은 비밀

위의 예시에서는 컴포넌트가 렌더링하는 동안 기존 변수를 변경하는 것이 문제였다. 이를 "변이(Mutation)"라고 부르기도 한다. 순수 함수는 함수의 범위를 벗어난 변수나 호출 전에 생성된 객체를 변이하지 않는다. 그러면 순수하지 않으니까!

그러나 **렌더링하는 동안 "방금" 생성한 변수와 객체를 변경하는 것은 완전히 괜찮다!** 이 예제에서는 \[] 배열을 생성하고 이를 cups 변수에 할당한 다음, 컵 12개를 그 안에 push한다.

```javascript
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

cups 변수나 \[] 배열이 함수 외부에서 생성되었다면 이는 큰 문제가 될 것이다. 해당 배열에 항목을 밀어넣음으로써 기존 객체를 변경하게 될 것이기 때문이다.

그러나 함수 내부에서 동일한 렌더링 중에 생성했기 때문에 괜찮다! 함수 외부의 어떤 코드도 이런 일이 일어났다는 것을 알 수 없다. 이를 **지역 변이**라고 하며, 컴포넌트의 작은 비밀과 같다.

## Where you can cause side effects

> 사이드 이펙트를 일으킬 수 있는 곳

함수형 프로그래밍은 순수성에 크게 의존하지만, 언젠가는 어딘가에서 무언가는 바뀌어야 한다. 이것이 바로 프로그래밍의 핵심이다! 화면 업데이트, 애니메이션 시작, 데이터 변경과 같은 이러한 변경을 **Side Effects**라고 하며, 렌더링 중에 일어나는 것이 아니라 "부수적으로(on the side)" 일어나는 일이다.

React에서 사이드 이펙트는 보통 **이벤트 핸들러**에 속한다. 이벤트 핸들러는 사용자가 어떤 동작을 수행할 때(버튼 클릭 등) React가 실행하는 함수이다. 이벤트 핸들러가 컴포넌트 내부에 정의되어 있긴 하지만 렌더링 중에는 실행되지 않는다! **따라서 이벤트 핸들러는 순수할 필요가 없다!**

다른 모든 옵션을 다 사용했는데도 사이드 이펙트에 적합한 이벤트 핸들러를 찾을 수 없다면, useEffect 호출을 통해 반환된 JSX에 이벤트 핸들러를 첨부할 수 있다. 이렇게 하면 나중에 렌더링 후 사이드 이펙트가 허용될 때 React가 이를 실행하도록 지시한다. **그러나 이 방법은 최후의 수단으로 사용해야 한다!!**

> 가능하면 렌더링만으로 로직을 표현하고자 노력해보자.

## Strict Mode

React는 개발 환경에서 각 컴포넌트의 함수를 두 번 호출하는 "Strict Mode"를 제공한다. Strict Mode는 컴포넌트 함수를 두 번 호출함으로써 이러한 규칙을 위반하는 컴포넌트를 찾아내는 데 도움이 된다.

위의 예제에서 “Guest #1”, “Guest #2”, “Guest #3” 대신 “Guest #2”, “Guest #4”, “Guest #6”이 어떻게 표시되었는지 볼 수 있었다. 원래 함수는 불완전했기 때문에 두 번 호출하면 함수가 "손상"되었다. 하지만 수정된 순수한 버전은 함수를 두 번 호출해도 잘 동작한다. **순수 함수는 계산만 하므로 두 번 호출해도 아무것도 바뀌지 않는다.** 언제나 "동일 입력, 동일 출력"이다.

Strict Mode는 production 환경에서는 아무런 영향을 미치지 않으므로 사용자의 앱 속도가 느려지지 않는다. Strict Mode를 선택하려면 루트 컴포넌트를 <React.StrictMode>로 감싸면 된다. 일부 프레임워크는 기본적으로 이 작업을 수행한다!
