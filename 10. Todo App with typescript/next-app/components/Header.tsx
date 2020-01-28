import React from "react";
import styled from "styled-components";
import { color } from "../styles/color";

const Container = styled.div`
  width: 100%;
  height: 52px;
  border-bottom: 1px solid ${color.gray};
  display: flex;
  align-items: center;
  h1 {
    font-size: 21px;
    font-weight: 400;
    padding-left: 12px;
    margin: 0;
  }
`;
const Header: React.FC = () => {
  return (
    <Container>
      <h1>Jerrynim's TodoList</h1>
    </Container>
  );
};

export default Header;
