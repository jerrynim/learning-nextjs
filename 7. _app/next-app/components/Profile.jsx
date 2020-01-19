import React from "react";
import css from "styled-jsx/css";
import { GoOrganization, GoLink, GoMail, GoLocation } from "react-icons/go";

const profileCss = css`
  .profile-box {
    width: 25%;
    max-width: 272px;
    margin-right: 26px;
  }
  .profile-image-box {
    width: 100%;
    border: 1px solid #e1e4e8;
    line-height: 0;
  }
  img {
    width: 100%;
  }
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    margin-top: 4px;
  }
  .location {
    margin-right: 6px;
    margin-top: 2px;
  }
  .status {
    padding: 8px;
    font-size: 12px;
  }
`;
const Profile = ({ user }) => {
  return (
    <>
      <div className="profile-box">
        <div className="profile-image-box">
          <img src={user.avatar_url} alt="깃허브 프로필 이미지" />
        </div>
        {user.name && <h3>{user.name}</h3>}
        {user.bio && <p>{user.bio}</p>}
        {user.company && (
          <p>
            <GoOrganization
              size={16}
              color="#6a737d"
              style={{ float: "left", marginTop: "2px", marginRight: "6px" }}
            />
            {user.company}
          </p>
        )}
        {user.location && (
          <p>
            <GoLocation
              size={16}
              color="#6a737d"
              style={{ float: "left", marginTop: "2px", marginRight: "6px" }}
            />
            {user.location}
          </p>
        )}
        {user.email && (
          <p>
            <GoMail
              size={16}
              color="#6a737d"
              style={{ float: "left", marginTop: "3px", marginRight: "6px" }}
            />
            {user.email}
          </p>
        )}
        {user.blog && (
          <p>
            <GoLink
              size={16}
              color="#6a737d"
              style={{ float: "left", marginTop: "3px", marginRight: "6px" }}
            />
            {user.blog}
          </p>
        )}
      </div>
      <style jsx>{profileCss}</style>
    </>
  );
};
export default Profile;
