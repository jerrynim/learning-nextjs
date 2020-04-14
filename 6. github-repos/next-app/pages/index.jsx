import React, { useState } from "react";
import Link from "next/link";

const App = () => {
  const [username, setUsername] = useState("");
  return (
    <div>
      <label>username</label>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <p>{username} 깃허브 검색하기</p>
      <Link href="/[username]" as={`/${username}`}>
        <a>링크</a>
      </Link>
    </div>
  );
};

export default App;
