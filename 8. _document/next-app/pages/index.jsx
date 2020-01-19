import React, { useState } from "react";
import Link from "next/link";
import css from "styled-jsx/css";

const MainCss = css`
  .main-wrapper {
    padding: 24px 50px;
  }
`;

const main = ({ repos, user }) => {
  const [username, setUsername] = useState("");
  return (
    <>
      <div className="main-wrapper">
        <label>username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <p>{username} 깃허브 검색하기</p>
        <Link href="/[username]" as={`/${username}`}>
          <a>링크</a>
        </Link>
      </div>
      <style jsx>{MainCss}</style>
    </>
  );
};

export default main;
