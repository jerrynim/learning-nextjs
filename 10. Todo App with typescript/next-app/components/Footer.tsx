import React from "react";
import styled from "styled-components";
import { pallete } from "../styles/pallete";
import { useRouter } from "next/dist/client/router";

const Container = styled.footer`
  width: 100%;
  height: 53px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid ${pallete.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  .footer-button {
    font-size: 32px;
    width: 32px;
    height: 32px;
    border-radius: 5px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 0;
    line-height: 0;
    outline: none;
    padding: 0 0 4px 3px;
  }
`;

const Footer: React.FC = () => {
  const router = useRouter();
  const isHome = router?.pathname === "/";
  return (
    <Container>
      <button
        className="footer-button"
        onClick={() => router.push(isHome ? "/add/todo" : "/")}
      >
        {isHome ? "+" : "-"}
      </button>
    </Container>
  );
};

export default Footer;
