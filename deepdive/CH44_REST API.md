## 44장 REST API

### REST란?

- REpresentational State Transfer의 약자
- HTTP/1.0과 1.1의 스펙 작성에 참여했고 아파치 HTTP 서버 프로젝트의 공동 설립자인 로이 펄딩의 2000년 논문에서 처음 소개되었음
- 발표 당시의 웹이 HTTP를 제대로 사용하지 못하고 있는 상황을 보고 HTTP의 장점을 최대한 활용할 수 있는 아키텍처로서 소개되었다.

### RESTful

- REST의 기본 원칙을 성실히 지킨 "서비스 디자인"을 RESTful하다고 표현한다.
- REST 아키텍처 스타일을 따르고 있는 것을 나타내는 형용사.

### 차이점

- REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 **아키텍처**
- REST API는 REST를 기반으로 **서비스 API를 구현한 것**. 설계된 API 그 자체.
  - REST API는 RESTful한 웹 서비스의 한 형태.
  - REST API는 어떤 프로그래밍 언어나 플랫폼에서도 사용 가능하므로, 서로 다른 시스템 간의 통합에 용이하다. 이는 웹 기술의 핵심 원칙 중 하나인 "상호 운용성"을 지원한다.

### REST API의 설계 원칙

1. URI는 리소스를 표현해야 한다. 리소스를 식별할 수 있는 이름은 동사보다는 명사를 사용해야 한다. 따라서 이름에 get 같은 행위에 대한 표현이 들어가서는 안 된다.

```http
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다. HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)을 알리는 방법이다. 주로 5가지 요청 메서드(GET, POST, PUT, PATCH, DELETE)를 사용하여 CRUD를 구현한다.

| 메서드 | 종류           | 목적                   | 페이로드 여부 |
| ------ | -------------- | ---------------------- | ------------- |
| GET    | index/retrieve | 모든/ 특정 리소스 조회 | 아니오        |
| POST   | create         | 리소스 생성            | 예            |
| PUT    | replace        | 리소스 전체 업데이트   | 예            |
| PATCH  | modify         | 리소스 부분 업데이트   | 예            |
| DELETE | delete         | 모든/특정 리소스 삭제  | 아니오        |

### REST API의 구성

REST API는 자원(Resource), 행위(Verb), 표현(Representation)의 3가지 요소로 구성된다.

REST API는 자원(Resource), 행위(Verb), 표현(Representation)의 3가지 요소로 구성됩니다. 이 세 가지 요소는 REST 아키텍처 스타일의 핵심 원칙 중 하나인 "Uniform Interface"의 구성 요소로서 중요한 역할을 합니다. 이를 자세히 설명해보겠습니다:

1. **자원 (Resource)**:

   - 자원은 REST API의 핵심 개념 중 하나로, 웹 서비스에서 다루려는 개체 또는 정보를 나타냅니다.
   - 자원은 고유한 식별자(URI 또는 URL)를 가집니다. 이 식별자를 통해 클라이언트는 특정 자원을 식별하고 액세스할 수 있습니다.
   - 예를 들어, 웹 상의 자원은 웹 페이지, 이미지, 사용자 프로필, 주문, 제품 등이 될 수 있습니다.
   - 자원은 REST API의 핵심 요소로서, URI를 통해 자원을 고유하게 식별하고 조작합니다.

2. **행위 (Verb)**:

   - 행위는 자원에 대한 조작 또는 작업을 나타내며, HTTP 메서드(Verb)로 표현됩니다.
   - 주요 HTTP 메서드로는 다음과 같은 것들이 있습니다:
     - **GET**: 자원을 조회하거나 읽을 때 사용합니다. (Read)
     - **POST**: 새로운 자원을 생성하거나 처리할 때 사용합니다. (Create)
     - **PUT**: 기존 자원을 업데이트하거나 대체할 때 사용합니다. (Update)
     - **DELETE**: 자원을 삭제할 때 사용합니다. (Delete)
   - 이러한 HTTP 메서드는 자원에 대한 다양한 작업을 수행하기 위해 사용됩니다.

3. **표현 (Representation)**:

   - 표현은 자원의 상태를 나타내는 방식이며, 자원의 데이터를 다양한 형식으로 표현합니다.
   - REST API에서 표현은 주로 데이터 형식인 JSON, XML, HTML 등을 사용하여 표현됩니다.
   - 클라이언트가 서버로부터 자원을 요청하면 서버는 해당 자원의 표현을 클라이언트에게 제공합니다.
   - 예를 들어, JSON 형식으로 표현된 사용자 정보, HTML 형식으로 표현된 웹 페이지 등이 있습니다.

이러한 자원, 행위, 표현의 구성 요소는 REST API의 설계와 사용에 있어 중요한 역할을 합니다. URI를 통해 자원을 식별하고, HTTP 메서드를 사용하여 자원에 대한 작업을 수행하며, 표현을 통해 자원의 상태를 클라이언트에게 전달합니다. 이러한 구성 요소를 적절하게 조합하여 RESTful한 API를 디자인하고 사용할 수 있습니다.

### JSON Server를 이용한 가상 REST API

HTTP 요청을 전송하고 응답을 받으려면 서버가 필요하다. JSON Server를 사용해 가상 REST API 서버를 구축할 수 있다. json-server는 주로 개발 및 프로토타이핑 단계에서 사용되며, 실제 백엔드 서버를 만들기 전에 클라이언트 애플리케이션을 개발 및 테스트하는 데 유용하다.

```shell
mkdir test && cd test
npm init -y
npm install json-server --save-dev
mkdir db.json && cd db.json
code . // vscode 오픈
```

```json
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": true
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": true
    },
    {
      "id": 3,
      "content": "JavsScript",
      "completed": false
    }
  ]
}
```

```shell
json-server --watch db.json // 기본 포트(3000) 사용 / watch 옵션 사용
```

이제 json-server에게 REST API를 요청할 수 있다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <pre></pre>
    <script>
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "/todos");
      xhr.send();
      xhr.onload = () => {
        if (xhr.status === 200) {
          const pre = document.querySelector("pre");
          pre.textContent = xhr.response;
        }
        {
          console.error("Error: ", xhr.status);
        }
      };
    </script>
  </body>
</html>
```
