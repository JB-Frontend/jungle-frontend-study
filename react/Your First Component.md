# Your First Component

> 첫번째 컴포넌트

<br>

**Components are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI), which makes them the perfect place to start your React journey!**

    컴포넌트는 React의 핵심 개념 중 하나입니다. 컴포넌트는 사용자 인터페이스(UI)를 구축하는 기반이 되므로 React 여정을 시작하기에 완벽한 곳입니다!

<br>

### 학습 내용

1. 컴포넌트가 무엇인지
2. React 어플리케이션에서 컴포넌트의 역할
3. 첫번째 React 컴포넌트를 작성하는 방법

<br>

## Components: UI building blocks

> 컴포넌트: UI 구성 요소

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

React를 사용하면 마크업, CSS, JavaScript를 앱의 재사용 가능한 UI 요소인 사용자 정의 “컴포넌트”로 결합할 수 있습니다.
위에서 본 목차 코드는 모든 페이지에 렌더링할 수 있는 `<TableOfContents />` 컴포넌트로 전환될 수 있습니다.
내부적으로는 여전히 `<article>`, `<h1>` 등과 같은 동일한 HTML 태그를 사용합니다.

```html
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

프로젝트가 성장함에 따라 이미 작성한 컴포넌트를 재사용하여 많은 디자인을 구성할 수 있으므로 개발 속도가 빨라집니다.  
위의 목차는 `<TableOfContents />`를 사용하여 어떤 화면에도 추가할 수 있습니다!

<br>

## Defining a component

> 컴포넌트 정의하기

기존에는 웹 페이지를 만들 때 웹 개발자가 콘텐츠를 마크업한 다음 JavaScript를 뿌려 상호작용을 추가했습니다.
이는 웹에서 상호작용이 중요했던 시절에 효과적이었습니다.
이제는 많은 사이트와 모든 앱에서 상호작용을 기대합니다.
React는 동일한 기술을 사용하면서도 상호작용을 우선시합니다.
React 컴포넌트는 마크업으로 뿌릴 수 있는 JavaScript 함수입니다.
그 모습은 다음과 같습니다(아래 예시를 편집할 수 있습니다):

```javascript
export default function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}
```

<br>

컴포넌트를 빌드하는 방법은 다음과 같습니다:

### Step 1: Export the component

> 컴포넌트 내보내기

`export default` 접두사는 표준 JavaScript 구문입니다(React에만 해당되지 않음).  
이 접두사를 사용하면 나중에 다른 파일에서 가져올 수 있도록 파일에 주요 기능을 표시할 수 있습니다.

<br>

### Step 2: Define the function

> 함수 정의하기

function Profile() { }을 사용하면 Profile이라는 이름의 JavaScript 함수를 정의할 수 있습니다.

주의할 점은, React 컴포넌트는 일반 JavaScript 함수이지만, 이름은 대문자로 시작해야 하며 그렇지 않으면 작동하지 않습니다!

<br>

### Step 3: Add markup

> 마크업 추가하기

이 컴포넌트는 `src` 및 `alt` 속성을 가진 `<img />` 태그를 반환합니다.
`<img />` 는 HTML처럼 작성되었지만 실제로는 JavaScript입니다!  
이 구문을 **JSX**라고 하며, JavaScript 안에 마크업을 삽입할 수 있습니다.

반환문은 이 컴포넌트에서처럼 한 줄에 모두 작성할 수 있습니다:

```javascript
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

<br>

그러나 마크업이 모두 return 키워드와 같은 라인에 있지 않은 경우에는 다음과 같이 괄호로 묶어야 합니다:

```javascript
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<br>

## Using a component

> 컴포넌트 사용하기

이제 `Profile` 컴포넌트를 정의했으므로 다른 컴포넌트 안에 중첩할 수 있습니다.  
예를 들어, 여러 `Profile` 컴포넌트를 사용하는 `Gallery` 컴포넌트를 내보낼 수 있습니다:

```javascript
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

<br>

### What the browser sees

> 브라우저에 표시되는 내용

대소문자의 차이에 주목하세요:

- `<section>` 은 소문자이므로 React는 HTML 태그를 가리킨다고 이해합니다.
- `<Profile />` 은 대문자 `P` 로 시작하므로 React는 `Profile` 이라는 컴포넌트를 사용하고자 한다고 이해합니다.

- 그리고 `<Profile />` 은 더 많은 HTML `<img />`가 포함되어 있습니다. 결국 브라우저에 표시되는 내용은 다음과 같습니다:

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

<br>

### Nesting and organizing components

> 컴포넌트 중첩 및 구성

컴포넌트는 일반 JavaScript 함수이므로 같은 파일에 여러 컴포넌트를 포함할 수 있습니다.
컴포넌트가 상대적으로 작거나 서로 밀접하게 관련되어 있을 때 편리합니다. 이 파일이 복잡해지면 언제든지 `Profile` 을 별도의 파일로 옮길 수 있습니다.

`Profile` 컴포넌트는 `Gallery` 내에 렌더링되기 때문에(심지어 여러 번!), `Gallery`는 각 `Profile` 을 “자식”으로 렌더링하는 **부모 컴포넌트**라고 말할 수 있습니다. 컴포넌트를 한 번 정의한 다음 원하는 곳에 원하는 만큼 여러 번 사용할 수 있다는 점이 바로 React의 마법입니다.

<br>

## 요약

- React를 사용하면 앱의 재사용 가능한 UI 요소인 `컴포넌트`를 만들 수 있습니다.
- React 앱에서 모든 UI는 `컴포넌트`입니다.
- React `컴포넌트`는 다음 몇 가지를 특성을 제외하고는 일반적인 JavaScript 함수와 같습니다:
  1. 컴포넌트의 이름은 항상 대문자로 시작합니다.
  2. JSX 마크업을 반환합니다.
