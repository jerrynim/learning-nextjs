const App = ({ movies }) => (
  <div>
    Hello Next.js!!
    {movies.map(movie => (
      <div>{movie.title}</div>
    ))}
  </div>
);
import fetch from "isomorphic-unfetch";

App.getInitialProps = async () => {
  const data = await fetch("https://yts.tl/api/v2/list_movies.json");
  const json = await data.json();
  return { movies: json.data.movies };
};
export default App;
