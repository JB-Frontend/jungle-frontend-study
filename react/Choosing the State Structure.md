## State 구조 선택

state를 잘 구조화(structuring)하면 수정과 디버깅이 편한 컴포넌트를 만들 수 있다. 이번 장에서는 state를 구조화할 때 고려해야 할 몇 가지 팁에 대해 알아볼 것이다.

### 학습 내용

- 단일 state 변수를 사용해야 하는 경우 vs. 다중 state 변수를 사용해야 하는 경우
- state 정리시 피해야 할 사항
- state 구조와 관련된 일반적인 문제를 해결하는 방법

### Principles for structuring state

- state 구조화 원칙
- state를 보유한 컴포넌트를 작성할 때는 선택을 해야 한다.
  - 얼마나 많은 state 변수를 사용할지
  - 데이터의 모양은 어떻게 할지
  - 등등
- 최적화되지 state 구조를 사용해도 문제는 없지만, 더 나은 선택을 위한 몇 가지 원칙이 있다.

> 1. 연관된 state는 그룹화하라.
> 2. state의 모순을 피하라.
> 3. 불필요한 state를 피하라.
> 4. state의 중복을 피하라.
> 5. 깊게 중첩된 state는 피하라.

이러한 원칙을 통해 state에서 불필요하거나 중복된 데이터를 제거하여 모든 데이터가 동기화 상태를 유지하도록 할 수 있다. 이를 통해 실수 없이 state를 쉽게 업데이트할 수 있다. 이는 데이터베이스 엔지니어가 버그 발생 가능성을 줄이기 위해 "데이터베이스 구조를 정규화"하는 것과 유사하다.

### 1. 연관된 state는 그룹화하라

```jsx
// 권장X
const [x, setX] = useState(0);
const [y, setY] = useState(0);

// 권장
const [position, setPosition] = useState({ x: 0, y: 0 });
```

### 2. state의 모순을 피하라

const [loading, setLoadign];
const [loaded, setLoaded];

### 3. 불필요한 state를 피하라

### 4. state의 중복을 피하라

### 5. 깊게 중첩된 state는 피하라

### Recap

- 두 개의 state 변수가 항상 함께 업데이트되는 경우 두 변수를 하나로 병합하는 것이 좋습니다.
- state 변수를 신중하게 선택하여 ‘불가능한’ state를 만들지 않도록 하세요.
- state를 업데이트할 때 실수할 가능성을 줄이는 방식으로 state를 구성하세요.
- 동기화 state를 유지할 필요가 없도록 불필요 및 중복 state를 피하세요.
- 특별히 업데이트를 막으려는 경우가 아니라면 props를 state에 넣지 마세요.
- 선택과 같은 UI 패턴의 경우 객체 자체 대신 ID 또는 인덱스를 state로 유지합니다.
- 깊게 중첩된 state를 업데이트하는 것이 복잡하다면 state를 평평하게 만들어 보세요.
