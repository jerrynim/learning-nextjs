import Link from "next/link";

const about = () => (
  <div>
    <h1>Hello!!</h1>
    <Link href="/">
      <a>Home</a>
    </Link>
    <br />
    <Link href="/jerry">
      <a>jerry</a>
    </Link>
  </div>
);
export default about;
