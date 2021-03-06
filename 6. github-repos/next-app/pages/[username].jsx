import React from "react";
import Profile from "../components/Profile";
import fetch from "isomorphic-unfetch";
import css from "styled-jsx/css";
import Repositories from "../components/Repositories";

const Container = css`
  .wrapper {
    display: flex;
  }
  .repositories-box {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    padding: 0px 16px;
  }
  .repo-head {
    padding: 16px 0;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #e1e4e8;
  }
  .repos-count {
    display: inline-block;
    padding: 2px 5px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    color: #586069;
    background-color: rgba(27, 31, 35, 0.08);
    border-radius: 20px;
  }
`;
const username = ({ repos, user, username }) => {
  return (
    <>
      {user && repos ? (
        <div className="wrapper">
          <Profile user={user} />
          <div className="repositories-box">
            <div className="repo-head">
              Repsitories
              <span className="repos-count">{user.public_repos}</span>
            </div>
            <Repositories repos={repos} username={username} />
          </div>
        </div>
      ) : (
        <div>유저 정보가 없습니다</div>
      )}
      <style jsx>{Container}</style>
    </>
  );
};

username.getInitialProps = async ({ query }) => {
  try {
    const { username } = query;
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const user = await userRes.json();
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&page=1&per_page=10`
    );
    const repos = await reposRes.json();
    return { repos, user, username };
  } catch (e) {
    console.log(e.message);
  }
  return {};
};
export default App;
