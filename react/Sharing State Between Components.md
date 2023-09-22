# Sharing State Between Components

> 컴포넌트 간의 state 공유

때로는 두 컴포넌트의 state가 항상 함께 변경되기를 원할 때가 있습니다. 그렇게 하려면 두 컴포넌트에서 state를 제거하고 가장 가까운 공통 부모로 이동한 다음 props를 통해 전달하면 됩니다. 이를 state 끌어올리기라고 하며, React 코드를 작성할 때 가장 흔히 하는 작업 중 하나입니다.

### 학습 내용

- state를 부모 컴포넌트로 끌어올려 컴포넌트끼리 공유하는 방법
- 제어 컴포넌트와 비제어 컴포넌트

<br>

## Lifting state up by example

> 예제로 알아보는 state 끌어올리기

이 예제에서는 부모 컴포넌트인 Accordion 컴포넌트가 두 개의 Panel 컴포넌트를 렌더링합니다.

- Accordion
  - Panel
  - Panel

각 Panel 컴포넌트는 콘텐츠 표시 여부를 결정하는 불리언 타입 isActive state를 가집니다.

```Javascript
import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}
```

현재로선 한 패널의 버튼을 눌러도 다른 패널에 영향을 주지 않고 독립적으로 동작합니다.

<br>

그러나 이제 한 번에 하나의 패널만 열리도록 변경하려고 합니다. 설계에 따르면,  
두 번째 패널을 열기 위해선 첫 번째 패널을 닫아야 합니다. 어떻게 해야 할까요?

1. 자식 컴포넌트에서 state를 제거합니다.
2. 공통 부모 컴포넌트에 하드 코딩된 데이터를 전달합니다.
3. 공통 부모 컴포넌트에 state를 추가하고 이벤트 핸들러와 함께 전달합니다.

이렇게 하면 Accordion 컴포넌트가 두 Panel 컴포넌트를 조정하고 한 번에 하나씩만 열리도록 할 수 있습니다.

<br>

## Step 1: Remove state from the child components

> 자식 컴포넌트에서 state 제거

부모 컴포넌트에 `Panel`의 `isActive`를 제어할 수 있는 권한을 부여합니다.  
즉, 부모 컴포넌트가 `isActive`를 `Panel`에 prop으로 대신 전달하게 됩니다.

<br>

먼저 Panel 컴포넌트에서 **다음 줄을 제거하세요**:

```JavaScript
const [isActive, setIsActive] = useState(false);
```

대신 `Panel`의 props 목록에 `isActive`를 추가하세요:

```JavaScript
function Panel({ title, children, isActive }) {
```

이제 `Panel`의 부모 컴포넌트는 `isActive`를 **prop으로 전달**하여 제어할 수 있습니다.  
반대로, 이제 `Panel` 컴포넌트는 `isActive` 값을 제어할 수 없습니다.  
이는 이제부터 부모 컴포넌트에 달려 있습니다!

<br>

## Step 2: Pass hardcoded data from the common parent

> 공통 부모에 하드 코딩된 데이터 전달하기

state를 끌어올리려면 조정하려는 두 자식 컴포넌트의 가장 가까운 공통 부모 컴포넌트를 찾아야 합니다.  
예제에서 가장 가까운 공통 부모는 `Accordion` 컴포넌트입니다. 두 패널 위에 있고 props를 제어할 수 있으므로

현재 어떤 패널이 활성화되어 있는지에 대한 “진실 공급원(source of truth)”이 됩니다.  
`Accordion` 컴포넌트가 두 패널 모두에 하드 코딩된 `isActive` 값(예: `true`)을 전달하도록 합니다:

```JavaScript
import { useState } from 'react';

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={true}>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={true}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}
```

`Accordion` 컴포넌트에서 하드코딩된 `isActive` 값을 편집하고 화면에서 결과를 확인해보세요.

<br>

## Step 3: Add state to the common parent

> 공통 부모에 state 추가

state를 끌어올리면 state로 저장하는 항목의 특성이 변경되는 경우가 많습니다.

이 경우 한 번에 하나의 패널만 활성화되어야 합니다. 즉, 공통 부모 컴포넌트인 `Accordion`는 어떤 패널이 활성화된 패널인지 추적해야 합니다. `boolean` 값 대신, 활성화된 `Panel` 의 인덱스를 나타내는 숫자를 state 변수로 사용할 수 있습니다:

```JavaScript
const [activeIndex, setActiveIndex] = useState(0);
```

`activeIndex`가 `0` 이면 첫번째 패널이 활성화된 것이고, `1` 이면 두 번째 패널이 활성화된 것입니다.

각 `Panel`에서 “Show” 버튼을 클릭하면 `Accordion`의 활성화된 인덱스를 변경해야 합니다.  
activeIndex state가 `Accordion` 내부에 정의되어 있기 때문에 `Panel`은 값을 직접 설정할 수 없습니다.  
`Accordion` 컴포넌트는 **이벤트 핸들러를 prop으로 전달**하여 `Panel` 컴포넌트가 state를 변경할 수 있도록 명시적으로 허용해야 합니다.

```JavaScript
<>
  <Panel
    isActive={activeIndex === 0}
    onShow={() => setActiveIndex(0)}
  >
    ...
  </Panel>
  <Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
  >
    ...
  </Panel>
</>
```

이제 `Panel` 안에 있는 `<button>`은 클릭 이벤트 핸들러로 `onShow` prop을 사용할 수 있습니다:

```JavaScript
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
```

이렇게 state 끌어올리기가 완성되었습니다! state를 공통 부모 컴포넌트로 옮기면 두 패널을 조정할 수 있게 됩니다. 두 개의 “is shown” 플래그 대신 활성화된 인덱스를 사용하면 한번에 하나의 패널만 활성화되게 할 수 있었습니다. 그리고 이벤트 핸들러를 자식에게 전달하면 자식이 부모의 state를 변경할 수 있었습니다.

<br>

## 요약

- 두 컴포넌트를 조정하려면 해당 컴포넌트의 state를 공통 부모로 이동합니다.
- 그런 다음 공통 부모로부터 props를 통해 정보를 전달합니다.
- 마지막으로 이벤트 핸들러를 전달하여 자식이 부모의 state를 변경할 수 있도록 합니다.
- 컴포넌트를 (props에 의해) “제어”할 지 (state에 의해) “비제어”할지 고려해보는 것은 유용합니다.
