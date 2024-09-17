# Coffies Vol.02 Front 

기존의 Coffies Vol.02에서 화면에 적용이 되었던 Theymleaf를 Next.js로 변경을 해본 리포지터리 입니다. 

### 기술스택

React : 18
React-dom : 18
React-quill : 2.0.0
React-kakao-maps-sdk : 1.1.27
React-daum-postcode : 3.1.3
React-query : 5.51.23
Next : 14.2.5
TypeScript : 5
Axios : 1.7.3
Tail-Wind : 3.4.1

### 기술을 사용한 이유 

React,Next

- 동적 렌더링 및 성능 최적화
    - 타임리프는 서버 사이드에서 HTML을 렌더링하는 템플릿 엔진으로, 서버에서 모든 페이지를 생성한 후 클라이언트로 보내는 방식입니다.
    - Next.js의 경우에는 페이지를 동적으로 생성을 하고 SSR,CSR을 지원을 해서 성능과 유연성을 극대화할 수 있습니다.

TypeScript

- 정적 타입 검사
    - TypeScript는 정적 타입을 제공하여 코드에서 발생할 수 있는 타입 관련 오류를 개발 중에 미리 발견할 수 있습니다. 이는 런타임에서 발생하는 버그를 줄여줄수 있습니다.

- 코드 가독성 향상
    - TypeScript는 명확한 타입 정의 덕분에 코드의 의도를 명확히 하고, 코드를 읽고 이해하기 쉽게 만듭니다.

Axios

- 간편한 HTTP 요청 처리
    - 비동기 처리를 할 때 간결하고 가독성이 있는 코드를 제공할 수 있습니다.

- 인터셉터 기능을 지원
    - 세션이나 토큰을 사용을 할 때 자동으로 추가를 해줄수 있고, 오류 응답에 공통적으로 처리를 할 수 있습니다. 


