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
  .pagination {
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 3px;
    width: fit-content;
    margin: auto;
    margin-top: 20px;
  }
  button {
    padding: 6px 12px;
    font-size: 14px;
    border: 0;
    color: #0366d6;
    font-weight: bold;
    cursor: pointer;
  }
  button:first-child {
    border-right: 1px solid rgba(27, 31, 35, 0.15);
  }

  button:hover {
    background-color: #0366d6;
    color: white;
  }
  button:disabled {
    color: rgba(27, 31, 35, 0.3);
  }
`;
const Repositories = ({ repos }) => {
  const router = useRouter();
  const { page, username } = router.query;
  return (
    <>
      <div>
        {repos &&
          repos.map(repo => (
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
        <div className="pagination">
          <button
            onClick={() =>
              router.push(
                `/${username}${
                  page === "2" ? "" : `?page=${parseInt(page, 10) - 1}`
                }`
              )
            }
            disabled={!page}
          >
            Previous
          </button>
          <button
            onClick={() =>
              router.push(
                `/${username}?${
                  !page ? "page=2" : `page=${parseInt(page, 10) + 1}`
                }`
              )
            }
          >
            Next
          </button>
        </div>
      </div>
      <style jsx>{RepositoriesCss}</style>
    </>
  );
};
export default Repositories;
