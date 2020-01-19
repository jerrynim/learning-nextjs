# #1 Install Next

### 폴더 만들기

```
$ mkdir next-app
$ cd next-app
```

### package.json 생성 및 next, react, react-dom 설치

```
$ yarn init -y
$ yarn add next react react-dom
```

### package.json에 scripts 생성

```
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
```

### /pages/index.jsx 생성

```
const App = () => <div>Hello Next.js!!</div>;
export default App;

```

```
tip :
1. pages 안에서 react를 import 하지 않아도 됩니다.
2. dev 모드 에서는 저장시마다 자동으로 컴파일해줍니다.
```
