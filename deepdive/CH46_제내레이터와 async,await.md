# 제너레이터란?
ES6에서 도입된 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다. 제너레이터와 일반 함수의 차이는 다음과 같다.
1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.

# 제너레이터 함수의 정의
제너레이터 함수는 `function*` 키워드로 선언한다. 그리고 하나 이상의 yield 표현식을 포함한다. 이것을 제외하면 일반 함수를 정의하는 방법과 같다.
```js
// 제너레이터 함수 선언문
function* genDecFunc(){
  yield 1;
}
// 제너레이터 함수 표현식
const genExpFunc = function* (){
  yield 1;
};

// 제너레이터 메서드
const obj = {
  * genObjMethod(){
    yield 1;
  }
};

// 제너레이터 클래스 메서드
class MyClass {
  * genClsMethod(){
    yield 1;
  }
}
```
주의해야 할 점은 제너레이터 함수는 화살표 함수로 정의할 수 없다는 것이다.
```js
const genArrowFunc = * () =>{yield 1;}; //SyntaxError

function * genFunc(){ yield 1; }
new genFunc(); // TypeError
```

# 제너레이터 객체
**제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다. 제너레이터 함수가 반환한 제너레이터 객체는 이터러블이면서 동시에 이터레이터다.**

제너레이터 객체는 next 메서드를 갖는 이터레이터이지만 이터레이터에는 없는 return, throw 메서드를 갖는다. 제너레이터 객체의 세 개의 메서드를 호출하면 다음과 같이 동작한다.
- next 메서드를 호출하면 제너레이터 함수의 yield 표현식까지 코드 블록을 실행하고 yield 된 값을 value 프로퍼티 값으로, flase를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
- return 메서드를 호출하면 인수로 전달받은 값을 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```js
function * genFunc(){
  try{
    yield 1;
    yield 2;
    yield 3;
  } catch (e){
    console.error(e);
  }
}

const generator = genFunc();

console.log(generator.next()); // {value : 1, done : false}
console.log(generator.return('End!')); // {value : "End!", done : true}
console.log(generator.throw('Error!')); // {value : undefined, done : ture}
```
# 제너레이터의 일시 중지와 재개
제너레이터는 yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다. 일반 함수는 호출 이후 제어권을 함수가 독점하지만 제너레이터 함수 호출자에게 제어권을 양도하여 필요한 시점에 함수 실행을 재개할 수 있다.
```js
function* genFunc(){
  yield 1;
  yield 2;
  yield 3;
}

const genrator = genFunc();
console.log(generator.next()); // {value : 1, done : false}
console.log(generator.next()); // {value : 2, done : false}
console.log(generator.next()); // {value : 3, done : false}
console.log(generator.next()); // {value : undefine, done : true}
```
next 메서드를 반복 호출하여 yield 표현식까지 실행과 일시 중지를 반복하다가 제너레이터 함수가 끝까지 실행되면 next 메서드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티에는 제너레이터 함수의 반환값이 할당되고 done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 ture가 할당된다.
```js
function* genFunc(){
  const x = yield 1;
  const y = yield (x + 10);
  return x + y;
}

const genrator = genFunc(0);
let res = generator.next();
console.log(res); // {value : 1, done : false}

res = generator.next(10);
console.log(res); // {value : 20, done : false}

res = generator.next(20);
console.log(res); // {value : 30, done : true}
```
이터레이터의 next 메서드와 달리 제너레이터 객체의 next 메서드에는 인수를 전달할 수 있다. **제너레이터 객체의 next 메서드에 전달한 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다.**  
이를 사용하여 제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다.

# 제너레이터의 활용
## 이터러블 구현
제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간단히 이터러블을 구현할 수 있다.
```js
// 무한 이터러블을 생성하는 함수
const infiniteFiobonacci = (function(){
  let [pre, cur] = [0, 1];
  
  return {
    [Symbol.iterator]() { return this; },
    next(){
      [pre, cur] = [cur, pre + cur];
      // 무한 이터러블이므로 done 프로퍼티를 생략한다.
      return { value : cur };
    }
  };
}())

for(const num of infiniteFibonacci){
  if(num > 10000) break;
  console.log(num); // 1 2 3 5 8 ... 2584 
}
```
```js
// 무한 이터러블을 생성하는 제너레이터 함수
const infiniteFibonacci = (function* (){
  let [pre, cur] = [0, 1];
  while(true){
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
}());

for(const num of infiniteFibonacci){
  if(num > 10000) break;
  console.log(num); // 1 2 3 5 8 ... 2584 
}
```

## 비동기 처리
```js
const fetch = require('node-fetch');

// 제너레이터 실행기
const async = generatorFunc =>{
  const generator = generatorFunc();

  const onResolved = arg => {
    const result = generator.next(arg);

    return result.done
    ? result.value
    : result.value.then(re => onResolved(res));
  };
  return onResolved;
}

(async(function* fetchTodo(){
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  
  const response = yield fetch(url);
  const todo = yield response.json();
  console.log(todo); // {userId : 1, title: 'delectus aut autem', completed: false}
}))
```
제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다. 이러한 특성을 활용하면 프로미스를 사용한 비동기 처리를 동기 처리처럼 구현할 수 있다. 다시 말해, 프로미스의 후속처리 메서드 then/catch/finally 없이 비동기 처리 결과를 반환하도록 구현할 수 있다.

# async/await
제너레이터를 사용해서 비동기 처리를 동기 처리처럼 동작하도록 구현했지만 코드가 무척이나 장황해지고 가독성도 나빠졌다. ES8에서 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있는 asyn/await가 도입되었다.
```js
const fetch = require('node-fetch');

async function fetchTodo(){
  const rul = 'https://jsonplaceholder/typicode.com/todos/1';

  const response = await fetch(url);
  const todo = await response.json();
  console.log(todo);
}
fetchTodo();
```
async/await를 사용하면 프로미스의 then/catch/finally 후속 처리 메서드에 콜백 함수를 전달해서 비동기 처리 결과를 후속 처리할 필요 없이 마치 동기 처리처럼 프로미스를 사용할 수 있다.
## async
await 키워드틑 반드시 async 함수 내부에서 사용해야 한다. async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다. async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

```js
// async 함수 선언문
async function foo(n) { return n; }
foo(1).then(v => console.log(v));

// async 함수 표현식
const bar = async funtion(n) { return n; };
bar(2).then(v => console.log(v));

// async 화살표 함수
const baz = async n => n;
baz(3).then(console.log(v));

// async 메서드
const obj = {
  async foo(n) { return n;}
};
obj.foo(4).then(v => console.log(v));

// async 클래스 메서드
class Myclass{
  async bar(n) { return n; }
}
const myClass = new MyClass();
myClas.bar(5).then(v=>console.log(v));
```
클래스의 constructor 메서드는 async 메서드가 클래스의 constructor 메서드는 인스턴스를 반환해야 하지만 async 함수는 언제나 프로미스를 반환해야 한다.
```js
class MyClass{
  async constructor(){}
  // SyntaxError
}
```

## await 키워드
await 키워드는 프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다. await 키워드는 반드시 프로미스 앞에서 사용해야한다.
```js
async function foo(){
  const a = await new Promise(resolve => setTimeout(() => resolve(1), 3000));
  const b = await new Promise(resolve => setTimeout(() => resolve(2), 2000));
  const c = await new Promise(resolve => setTimeout(() => resolve(3), 1000));
  console.log([a,b,c]); // [1,2,3]
}

foo();
```

## 에러처리
```js 
const fetch = require('node-fetch');

const foo = async() =>{
  try {
    const wrongUrl = 'https://wrong.url';

    const response = await fetch(wrongUrl);
    const dat = await response.json();
    console.log(data);
  } catch (err){
    console.log(err); // TypeError : Failed to fetch
  }
}
```
async/await에서 에러 처리는 try..catch 문을 사용할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.
위 예제의 foo 함수 내에서 catch 문은 HTTP 통신에서 발생한 네트워크 에러뿐 아니라 try 코드 블록 내의 모든 문에서 발생한 이반적인 에러까지 모두 캐치할 수 있다.
```js
const fetch = require('node-fetch');

const foo = async() =>{
  const wrongUrl = 'https://wrong.url';

  const response = await fetch(wrongUrl);
  const data = await response.json();
  return data;
};

foo()
  .then(console.log)
  .catch(console.error)
```