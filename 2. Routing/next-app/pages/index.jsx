import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

class ClassApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.setName = this.setName.bind(this);
  }

  setName(value) {
    this.setState({ name: value });
  }

  render() {
    return <div />;
  }
}

const App = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  return (
    <div>
      <h2>Link to static Page</h2>
      <Link href="/jerry">
        <a>jerry</a>
      </Link>
      <br />
      <h3>이름</h3>
      <input value={name} onChange={e => setName(e.target.value)} />
      <br />
      <br />

      <Link href="/person/[name]" as={`/person/${name}`}>
        <a>Link to someone</a>
      </Link>

      <br />
      <br />

      <button onClick={() => router.push("/jerry")}>jerry로 가기</button>
      <br />

      <button onClick={() => router.push("/person/[name]", `/person/${name}`)}>
        name으로 가기
      </button>
    </div>
  );
};
export default App;
