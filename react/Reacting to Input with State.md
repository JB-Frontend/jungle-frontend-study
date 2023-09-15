## state로 입력에 반응하기

React는 UI를 조작하는 선언적인 방법을 제공한다. UI를 개별적으로 직접 조작하는 대신 컴포넌트의 상태를 정의하고, 사용자 입력에 반응하여 각 상태들 사이를 전환하도록 한다.

### 학습 내용

- 선언형 UI 프로그래밍과 명령형 UI 프로그래밍의 차이점
- 컴포넌트가 있을 수 있는 다양한 시각적 state를 열거하는 방법
- 코드에서 다른 시각적 state 간의 변경을 촉발하는 방법

### 선언형 UI와 명령형 UI의 차이점

선언형 UI와 명령형 UI는 사용자 인터페이스를 구성하고 관리하는 두 가지 다른 접근 방식이다.

### 선언형 UI

1. **작동 방식**: 상태에 따라 UI가 어떻게 보여야 하는지 선언한다. 직접 UI를 조작하지 않는다. 대신 표시할 내용을 알려주면 React가 UI를 업데이트할 방법을 알아낸다.
2. **예시 프레임워크**: React, SwiftUI 등
3. **코드 예시**:

```jsx
function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}
```

4. **장점**: 코드가 간결하고 이해하기 쉽다. 상태 관리가 중앙화되어 있어서 예측 가능하다.

### 명령형 UI

1. **작동 방식**: 상태 변화가 일어날 때마다 UI를 어떻게 변경해야 하는지 명령을 내린다.
2. **예시 프레임워크**: jQuery, 전통적인 Android 개발 등
3. **코드 예시**:

```javascript
const button = document.createElement("button");
button.innerText = "Click me";
button.addEventListener("click", () => {
  alert("Button clicked");
});
document.body.appendChild(button);
```

4. **장점**: UI 업데이트가 필요할 때마다 세밀한 제어가 가능하다.

### UI를 선언적인 방식으로 생각하기

1. 컴포넌트의 다양한 시각적 상태를 **식별**합니다.
2. 상태 변화를 촉발하는 요소를 **파악**합니다.
3. `useState`를 사용하여 메모리의 상태를 **표현**합니다.
4. 비필수적인 state 변수를 **제거**합니다.
5. 이벤트 핸들러를 **연결**하여 state를 설정합니다.

### Step 1: 컴포넌트의 다양한 시각적 상태 식별하기

먼저 사용자에게 표시될 수 있는 UI의 다양한 상태(state)를 모두 시각화한다.

- **Empty**: form의 “Submit”버튼은 비활성화되어 있습니다.
- **Typing**: form의 “Submit”버튼이 활성화되어 있습니다.
- **Submitting**: form은 완전히 비활성화되어있고 Spinner가 표시됩니다.
- **Success**: form 대신 “Thank you”메세지가 표시됩니다.
- **Error**: ‘입력중’ 상태와 동일하지만 추가로 오류 메세지가 표시됩니다.

### Step 2: 상태 변경을 촉발하는 요인 파악하기

두 종류의 입력으로 상태 변경을 촉밣할 수 있다. Human inputs의 경우, 종종 이벤트 핸들러가 필요하다.

- Human inputs: 버튼 클릭, 필드 입력, 링크 이동 등
- Computer inputs: 네트워크에서 응답 도착, 시간 초과, 이미지 로딩 등

두 경우 모두 **state 변수**를 설정해야 UI를 업데이트할 수 있다. form을 개발 중일 떄, 여러가지 입력에 따라 state를 변경해야 한다.

- **text 입력을 변경**(사람)하면 text box가 비어있는지 여부에 따라 *비어있음* state에서 입력중 state로, 또는 그 반대로 전환해야합니다.
- **제출 버튼을 클릭**(사람)하면 *제출중* state로 전환해야합니다.
- 네트워크 응답 성공(컴퓨터)시 *성공* state로 전환해야 합니다.
- 네트워크 요청 실패(컴퓨터)시 일치하는 오류 메세지와 함께 *오류* state로 전환해야 합니다.

이런 흐름을 시각화하기 위해 다음처럼 그림을 그릴 수 있다. 각 state가 적힌 원과 각 state 사이의 변경 사항을 화살표로 그린다. 이 방식으로 흐름을 파악할 수 있을 뿐만 아니라 구현하기 전에 버그를 잡을 수 있다!

![[Pasted image 20230914162723.png]]

### Step 3: 메모리의 상태를 `useState` 로 표현하기

이제 컴포넌트의 시각적 상태를 `useState`로 표현해야 한다. 이 과정은 단순함이 핵심이다. 복잡할수록 버그가 많이 발생한다. 반드시 필요한 state부터 시작하자. 예를 들어, 입력에 대한 answer를 저장하고, 가장 마지막에 발생한 error도 저장해야 한다.

```javascript
const [answer, setAnswer] = useState("");
const [error, setError] = useState(null);
```

그런 다음 앞서 설명한 시각적 상태 중 어떤 상태를 표시할지를 나타내는 state 변수가 필요하다. 여러가지 표현 방법이 있겠지만, 가장 좋은 방법을 즉시 생각하기 어렵다면 모든 시각적 상태에 대한 state를 추가해보자. 나중에 리팩토링하면 된다!

```javascript
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

### Step 4: 필수적이지 않은 state 변수 제거하기

state 변수의 중복을 피해서 구조를 리팩토링할 수 있다. 목표는 "state가 사용자에게 유효한 UI를 보여주지 않는 경우를 방지하는 것"이다.(예를 들어, 오류 메시지를 표시하면서 입력을 비활성화하면 사용자는 오류를 수정할 수 없게 된다!)

리팩토링을 하기 위해 다음의 질문을 따라보자.

1. state가 모순을 야기하는가?

- `isTyping` 과 `isSubmitting`은 동시에 `true`일 수 없습니다. 이러한 모순은 일반적으로 state가 충분히 제약되지 않았음을 의미합니다. 두 boolean의 조합은 네 가지가 가능하지만 유효한 state는 세 가지뿐입니다. “불가능한” state를 제거하려면 세 가지 값을 하나의 status로 결합하면 됩니다: `'typing'`, `'submitting'`, `'success'`.

2. 다른 state 변수에 이미 같은 정보가 있나?

- `isEmpty`와 `isTyping`은 동시에 `true`가 될 수 없습니다. 이를 각 state 변수로 분리하면 동기화되지 않아 버그가 발생할 위험이 있습니다. 다행히 `isEmpty`를 제거하고 대신 `answer.length === 0`으로 확인할 수 있습니다.

3. 다른 state 변수를 뒤집으면 동일한 정보를 얻을 수 있나?

- `isError`는 `error !== null`을 대신 확인할 수 있기 때문에 필요하지 않습니다.

이렇게 정리하고 나면 3개(7개가 줄어든!)의 _필수_ state 변수만 남는다. 이들은 기능을 망가뜨리지 않고는 어느 하나도 제거할 수 없으므로 필수 요소임을 알 수 있다.

```javascript
const [answer, setAnswer] = useState("");
const [error, setError] = useState(null);
const [status, setStatus] = useState("typing"); // 'typing', 'submitting', or 'success'
```

### reducer로 불가능한 state 제거하기

이 세 state 변수는 이 form의 상태를 잘 표현한다. 그러나 불완전한 중간 상태가 몇 가지 있다. 예를 들어, null이 아닌 error는 status가 'success'일 때는 의미가 없다. state를 조금 더 정확하게 모델링하려면 reducer로 분리하면 된다! reducer를 사용하면 여러 state 변수를 하나의 객체로 통합하고 관련된 모든 로직도 합칠 수 있다.

### Step 5: 이벤트 핸들러를 연결하여 state 설정하기

마지막으로 state 변수를 설정하는 이벤트 핸들러를 생성한다. 아래는 모든 이벤트 핸들러가 연결된 최종 form이다.

```jsx
import { useState } from "react";

export default function Form() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <h1>That's right!</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("Good guess but a wrong answer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

이 선언형 방식의 코드는 명령형으로 짰을 때보다 길지만 훨씬 덜 취약하다. 모든 상호작용을 state 변화로 표현하면 나중에 기존 상태를 깨지 않고도 새로운 시각적 상태를 도입할 수 있다. 또한, 상호작용 자체의 로직을 변경하지 않고도 각 state에 표시되어야 하는 항목을 변경할 수 있다.
