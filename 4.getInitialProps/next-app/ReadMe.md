# 4. getInitialProps

### isomorphic-unfetch 설치

서버에서 fetch를 사용하기 위해서는 isomorphic-unfetch를 사용한다.

```
$ yarn add isomorphic-unfetch
```

### getInitialProps

```
App.getInitialProps = async () => {
  const data = await fetch("https://yts.tl/api/v2/list_movies.json");
  const json = await data.json();
  return { movies: json.data.movies };
};
```

App에 getInitialProps를 지정해주면 서버에서 데이터를 페치하고 전달 할 수 있다.
