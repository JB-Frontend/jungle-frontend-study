## var 키워드로 선언한 변수의 문제점
### var 키워드로 선언한 변수의 문제점
```js
var x = 1;
var y = 1;
var x = 100;
var y; 
console.log(x); // 100
console.log(y); // 1
```
`var` 키워드로 선언한 변수는 중복 선언이 가능하다.  
중복 선언하면 초기화문(변수 선언과 동시에 초기값을 할당하는 문) 유무에 따라 다르게 동작한다.  
초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작하고 초기화문이 없는 변수 선언문은 무시된다.  

### 함수 레밸 스코프
```js
var i = 10;
for(var i = 0; i < 5;i++){
  console.log(i) // 0 1 2 3 4
}
console.log(i); // 5
```
`var` 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 따라서 함수 외부에서 `var` 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.  
함수 레벨 스코프는 전역 변수를 남발할 가능성을 높인다.

### 변수 호이스팅
```js
console.log(foo); // undefine
foo = 123;
console.log(foo); // 123
var foo;
```
`var` 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다.  
변수 선언문 이전에 변수를 참조하는 것은 변수 호이스팅에 의해 에러를 발생시키지는 않지만 가독성을 떨어뜨린다.  

## let 키워드
### 변수 중복 선언 금지
```js
let foo = 123;
let foo = 456; // SyntaxError : Identifier 'bar' has already been declare
```
`let` 키워드로 이름이 같은 변수를 중복 선언하면 문법 에러가 발생한다.

### 블록 레벨 스코프
```js
let foo = 1;
{
  let foo = 2;
  let bar = 3;
}
console.log(foo); // 1
console.log(bar); // ReferenceError
```
`let` 키워드로 선언한 변수는 모든 코드 블록(함수, if 문, while 문, try/catch 문 등)을 지역 스코프로 인정하는 `블록 레벨 스코프`를 따른다.

### 변수 호이스팅
```js
console.log(foo); // ReferenceError : foo is not defined;
let foo;
```
`let` 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것 처럼 동작한다.  
**let 키워드로 선언한 변수는 "선언 단계"와 "초기화 단계"가 분리되어 진행된다. var의 경우 "선언 단계"와 "초기화 단계"가 동시에 진행 된다.**  
 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다.

```js
let foo = 1; // 전역 변수
{
  console.log(foo); // ReferenceError : Cannot access 'foo' before initialization
  let foo = 2; // 지역 변수
}
```
`let` 키워드로 선언한 변수의 경우 변수 호이스팅이 발생하지 않는 것처럼 보이지만 그것은 아니다.  
**호이스팅은 초기화는 끌어올리지 않지만 선언은 끌어올린다.**   
따라서 로그를 찍었을 때 `1`이 아니라 `ReferenceError`를 발생시킨다.  
  
자바스크립트는 ES6에서 도입된 `let`, `const`를 포함해서 모든 선언을 호이스팅 한다. 단, ES6에서 도입된 `let`, `const`, `class`를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다.

## 전역 객체와 let
```js
//브라우저 환경에서만
var x = 1; // 전역변수
y = 2; // 암묵적 전역
function foo() {} // 전역 함수

//전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
console.log(x) // 1
console.log(window.y); // 2
console.log(y) // 2
console.log(window.foo) // f foo() {}
console.log(foo) // f foo() {}

// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x);
```
`var` 키워드로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 `window`의 프로퍼티가 된다. 전역 객체의 프로퍼티를 참조할 때 `window`를 생략할 수 있다.

```js
let x = 1;
console.log(window.x); // undefined
console.log(x); // 1
```
`let` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.  
`let` 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재하게 된다.  

## const
```js
const foo; // SyntaxError
```
**const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.**  
  
### 재할당 금지
```js
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable
```
**const 키워드로 선언한 변수는 재할당이 금지된다.**