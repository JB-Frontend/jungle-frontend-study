# Importing and Exporting Components

React에서의 컴포넌트 : UI를 구성하고 렌더링하는 단위. **함수**나 **클래스**로 정의.  
  
컴포넌트의 가장 큰 장점은 재사용성!

## The root component file
```js
//App.js
function Profile() { // 컴포넌트
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile /> {/* 재사용 되는 컴포넌트 */}
      <Profile /> {/* 재사용 되는 컴포넌트 */}
      <Profile /> {/* 재사용 되는 컴포넌트 */}
    </section>
  );
}
```
`Create React App`에서는 앱 전체가 `scr/App.js`에서 실행되고 `App.js`는 **root 컴포넌트 파일**이라고 불리워진다.  
설정에 따라 root 컴포넌트를 다른 파일로 위치할 수 있다.

---
## Exporting and importing a component

한 컴포넌트 안에서 기능이 추가되고 코드가 길어진다면 다른 컴포넌트 파일을 만드는 것이 좋다.  
이렇게 하면 보다 모듈성이 강화되고 따로 빼놓은 기능만을 다른 파일에서 재사용 할 수 있게 된다.  
```js
//App.js
import Gallery from './Gallery.js'; // 사용하고 싶은 외부 컴포넌트를 임포트
export default function App() {
  return (
    <Gallery /> // 외부 컴포넌트 사용
  );
}
```
React에서는 `import Gallery from './Gallery'` 처럼 사용할 수 있지만 `./Gallery.js`를 사용하는 것이 `ES Modules` 사용 방법에 더 가깝다고 할 수 있다.

```js
//Gallery.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() { // export를 하여 다른 컴포넌트에서 사용할 수 있도록 한다.
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
---
## Default vs named export
|Syntax|<center>Export statement</center>| <center>Import statement</center>|
|-|-|-|
|Default|`export default function Button(){}`|`import Button from './Button.js';` |
|Named|`export function Button(){}`|`import { Button } from './Button.js'`|

Export 하는 방식에 따라 import 하는 방식이 정해진다. Default export로 한 값을 named import로 가져오려고 하려면 에러가 발생한다.  
  
`default import`를 사용하는 경우 원한다면 `import` 후에 다른 이름으로 값을 가져올 수 있다.
```js
//예시
import Banana from './Button.js'
```
보편적으로 **한 파일에서 하나의 컴포넌트만 export 할 때 default export 방식**을 사용하고 **여러 컴포넌트를 export 할 경우엔 named export 방식**을 사용한다.  

※ **default export**는 한 파일 안에서 한 개만 가질 수 있다!

### named export 예시
```js
// App.js
import {Gallery, Profile} from 'Gallery.js' // named
export default function App() {
  return (
    <Profile />
    <Gallery />
  );
}
```
```js
// Gallery.js
export function Profile{}
export function Gallery{}
```

