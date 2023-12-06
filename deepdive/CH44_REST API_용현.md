# REST API
REST는 Representational State Transfer의 약자이다. 로이 필딩이 HTTP의 장점을 최대한 활용할 수 있도록 REST 아키텍쳐를 소개했고 이는 HTTP 프로토콜의 의도에 맞게 디자인하도록 유도하고 있다. REST의 기본 원칙을 성실히 지킨 서비스 디자인을 **RESTful**이라고 표현한다.  
REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미힌다.  
  
  

# 44.1 REST API의 구성
REST API는 자원(resource), 행위(verb), 표현(representations)의 3각지 요소로 구성된다. REST는 자체 표현 구조(self-de-scriptiveness)로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있다.  

|구성 요소| 내용 | 표현 방법|  
|---|---|---|
|자원|자원|URI(엔드포인트)|
|행위|자원에 대한 행위|HTTP 요청 메서드|
|표현|자원에 대한 행위의 구체적 내용| 페이로드|

# 44.2 REST API 설계 원칙
REST에서 가장 중요한 기본적인 원칙은 두 가지다. **URI는 리소스를 표현**하는 데 집중하고 **행위에 대한 정의는 HTTP 요청 메서드**를 통해 하는 것이 RESTful API를 설계하는 중심 규칙이다.  
## 1. URI는 리소스를 표현해야 한다.
```js
# bad
GET /getTodos/1

# good
GET /todos/1
```
위에 bad 처럼 URI에 리소스를 제외하고 get과 같은 행위에 대한 정의를 넣으면 안된다.  
## 2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.
HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)를 알리는 방법이다. 주로 5가지 요청 메서드(GET, POST, PUT, PATCH, DELELTE 등)를 사용하여 CRUD를 구현한다.
| 메서드 | 종류           | 목적                   | 페이로드 여부 |
| ------ | -------------- | ---------------------- | ------------- |
| GET    | index/retrieve | 모든/ 특정 리소스 조회 | 아니오        |
| POST   | create         | 리소스 생성            | 예            |
| PUT    | replace        | 리소스 전체 업데이트   | 예            |
| PATCH  | modify         | 리소스 부분 업데이트   | 예            |
| DELETE | delete         | 모든/특정 리소스 삭제  | 아니오        |

리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않는다. 예를 들어, 리소스를 취득하는 경우에는 GET, 리소스를 삭제하는 경우에는 DELETE를 사용하여 리소스에 대한 행위를 명확히 표현한다.

# JSON Server를 이용한 REST API 실습
## GET
서버에 데이터를 요청할 때 사용
```js
// HTTP 요청 초기화
// todos 리소스에서 모든 todo를 취득(index)
xhr.open('GET', '/todos');

// HTTP 요청 전송
xhr.send();
```

## POST
서버에 저장할 데이터를 전송
```js
// HTTP 요청 초기화
// todos 리소스에서 모든 todo를 취득(index)
xhr.open('POST', '/todos');

// 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
xhr.setRequestHeader('content-type','application/json');

// HTTP 요청 전송
// 새로운 todo를 생성하기 위해 페이로드를 서버에 전송해야 한다.
xhr.send(JSON.stringify({id: 4, content: 'Angular', completed : false}));
```
## PUT
서버에 데이터 전체 수정
```js
// HTTP 요청 초기화
// todos 리소스에서 모든 todo를 취득(index)
xhr.open('PUT', '/todos');

// 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
xhr.setRequestHeader('content-type','application/json');

// HTTP 요청 전송
// 새로운 todo를 생성하기 위해 페이로드를 서버에 전송해야 한다.
xhr.send(JSON.stringify({id: 4, content: 'React', completed : false}));
```

## PATCH
서버 데이터 일부 수정
```js
// HTTP 요청 초기화
// todos 리소스에서 모든 todo를 취득(index)
xhr.open('PUT', '/todos/4');

// 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
xhr.setRequestHeader('content-type','application/json');

// HTTP 요청 전송
// 새로운 todo를 생성하기 위해 페이로드를 서버에 전송해야 한다.
xhr.send(JSON.stringify({id: 4, content: 'React', completed : false}));
```

## DELETE
서버 데이터 삭제
```js
// HTTP 요청 초기화
// todos 리소스에서 모든 todo를 취득(index)
xhr.open('DELETE', '/todos/4');

// HTTP 요청 전송
xhr.send();
```