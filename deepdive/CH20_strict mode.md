# strict mode 

```javascript
function foo(){
    x = 10;
}
foo();

console.log(x); //10
```

위 코드에서 전역 스코트에 x 변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다. 이때 전역 객체의 x 프로퍼티는 마치 전역 변수처럼 사용할 수 있다. 이러한 현상을 `암묵적 전역`이라고 한다.  
이를 방지하기 위해서는 반드시 `var`,`let`,`const` 키워드를 사용하여 변수를 선언한 다음 사용해야 한다.  
  
  하지만 오타나 문법 지식의 미비로 인한 실수는 언제나 발생한다. 이를 근본적으로 해결하기 위해 `ES5`부터 `strict mode`가 추가되었다.

---

## strict mode의 적용
strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에`'use strict';`를 추가한다. 전역의 선두에 추가하면 스크립트 전체에 strict mode가 적용된다.  
```javascript
'use strict';

function foo(){
    x = 10; // ReferenceError : x is not defined
}
foo();
```
함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict mode가 적용된다.
```javascript
function foo(){
    'use strict';
    x = 10; // ReferenceError : x is not defined
}
foo();
```
코드의 선두에 'user strict;'를 위치시키지 않으면 strict mode가 제대로 동작하지 않는다.
```javascript
function foo(){
    x = 10;
    'use strict';
}
foo();
```

### strict mode 사용시 주의해야할 점

1. 전역에 strict mode를 적용하는 것은 피하자
```javascript
<body>
    <script>
        'use strict';
    </script>
    <script>
        x = 1; // 에러 발생 x
    </script>
</body>
```
위 예제와 같이 스크립트 단위로 적용된 strict mode는 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용된다.  
하지만 strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. **특히 외부 서드파티 라이브러리를 사용하는 경우 라이브러리가 non-strict mode인 경우도 있기 때문에 전역에 strict mode를 적용하는 것은 바람직하지 않다.**

2. 함수 단위로 strict mode를 적용하는 것도 피하자.  
함수 단위로 strict mode를 적용할 수 있으나 모든 함수에 일일이 strict mode를 적용하는 것은 번거로운 일이다. 그리고 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.  
```javascript
(function(){
    //non-strict mode
    var let = 10; // 에러가 발생하지 않는다.

    function foo(){
        'use strict';
        let = 20; // SyntaxError
    }
    foo();
}())
```
  
**※따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.**
```javascript
(function(){
    'use strict';

    // Do something
}())
```
## strict mode가 발생시키는 에러

### 암묵적 전역
```javascript
(function(){
    'use strict';
    x = 1;
    console.log(x); //ReferenceError
})
```
선언하지 않은 변수를 참조하면 ReferenceError 발생

### 변수, 함수, 매개변수의 삭제
```javascript
(function(){
    'use strict';
    var x = 1;
    delete x; //SyntaxError

    function foo(a){
        delete a; //SyntaxError
    }
    delete foo; //SyntaxError
}());
```
delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생한다.

### 매개변수 이름의 중복
```javascript
(function(){
    'use strict';
    //SyntaxError
    function foo(x, x){
        return x + x;
    }
    console.log(foo(1,2));
}());
```
중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.

### with 문의 사용
with문을 사용하면 SyntaxError가 발생한다. with문은 전달된 객체를 스코프 체인에 추가한다. with 문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있다. 따라서 with 문은 사용하지 않는 것이 좋다.
```javascript
(function(){
    'use strict';
    //SyntaxError
    with({x:1})
    console.log(x);
}());
```