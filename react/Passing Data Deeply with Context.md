## Context로 데이터 깊숙이 전달하기

일반적으로 부모 컴포넌트에서 자식 컴포넌트로 props를 통해 data를 전달한다. 그러나 중간에 여러 컴포넌트를 거쳐야 하거나 앱의 여러 컴포넌트가 동일한 정보를 필요로 하는 경우 props를 전달하면 장항하고 불편해질 수 있다. Context를 사용하면 부모 컴포넌트가 깊이와 무관하게 하위의 모든 컴포넌트에서 data를 사용할 수 있다.

### 학습 내용

- “Prop drilling”이란 무엇인가
- 반복적인 prop 전달을 Context로 대체하는 방법
- Context의 일반적인 사용 사례
- Context에 대한 일반적인 대안

### Passing props의 문제

- Passing Props(props 전달): UI 트리를 통해 데이터를 컴포넌트에 명시적으로 연결할 수 있는 좋은 방법
- 그러나 트리 깊숙이 prop을 전달해야 하거나, 많은 컴포넌트에 동일한 prop이 필요한 경우 장황하고 불편해질 수 있다.
- 데이터를 제공하는 컴포넌트와 데이터를 필요로 하는 컴포넌트가 멀리 떨어져 있을 수 있으며, state를 가장 가까운 공통 조상으로 끌어올리면(lifting state up) "**Prop Drilling**"이라 불리는 상황이 발생한다.

### Context: Passing Props의 대안

- Context를 사용하면 상위 컴포넌트가 그 아래 전체 트리에 데이터를 제공할 수 있다.

- Passing Props 방식

```jsx
// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

// Section.jsx
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}

// Heading.jsx
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}

```

- Context API 방식

```jsx
// App.jsx
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

// LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);

// Section.jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}


// Heading.jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}

```

### Context 유의사항

- Context는 강력하지만 남용해서는 안 된다.
- props를 몇 단계 깊이 전달해야 한다고 해서, context에 넣어서는 안 된다.
- 다음의 접근 방식을 시도해보고 context를 고려해보자.

1. Passing Props로 시작하자. props를 사용하여 데이터 흐름을 명확하게 하는 것은 유지보수에 도움이 된다.
2. JSX를 children으로 전달하자. `<Layout posts={posts} />` 보다는 `<Layout><Posts posts={posts} /></Layout>`을 사용하면 props 에 대한 레이어 수가 줄어든다.
