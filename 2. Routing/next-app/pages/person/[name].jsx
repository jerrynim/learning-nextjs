import Link from "next/link";
import { useRouter } from "next/router";

const name = () => {
  const router = useRouter();
  console.log(router);
  return (
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
};
export default name;
