import Link from "next/link";
import fetch from "isomorphic-unfetch";

const Index = ({ movies }) => (
  <div>
    Hello Movies!!
    {/* {movies.map(movie => (
      <div>{movie.title}</div>
    ))} */}
    <Link href="hello">
      <a>hello</a>
    </Link>
  </div>
);

Index.getInitialProps = async function() {
  try {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    console.log(res);
    const data = await res.json();
    console.log(`Show data fetched. Count: ${data.length}`);
    return {
      movies: data.data.movies
    };
  } catch (e) {
    console.log(e);
  }
  return {};
};

export default Index;
