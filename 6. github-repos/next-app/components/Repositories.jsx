import React from "react";
import css from "styled-jsx/css";
import formatDistance from "date-fns/formatDistance";
import { useRouter } from "next/router";

const RepositoriesCss = css`
  .repository-box {
    width: 100%;
    border-bottom: 1px solid #e1e4e8;
    padding: 24px 0;
  }
  .description {
    padding: 12px 0;
  }
  a {
    text-decoration: none;
  }
  h2 {
    margin: 0;
    color: #0366d6;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
  }
  h2:hover {
    text-decoration: underline;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
  span {
    margin-left: 20px;
  }
`;
const Repositories = ({ repos, user, username }) => {
  const router = useRouter();
  return (
    <>
      <div>
        {repos.map(repo => (
          <div key={repo.id} className="repository-box">
            <a
              target="_blank"
              href={`https://github.com/${username}/${repo.name}`}
            >
              <h2>{repo.name}</h2>
            </a>
            <p className="description">{repo.description}</p>
            <p>
              {repo.language}
              <span className="updated-time">
                {formatDistance(new Date(repo.updated_at), new Date(), {
                  addSuffix: true
                })}
              </span>
            </p>
          </div>
        ))}
      </div>
      <style jsx>{RepositoriesCss}</style>
    </>
  );
};
export default Repositories;
