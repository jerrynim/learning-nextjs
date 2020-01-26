import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 52px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0px 12px;
  display: flex;
  align-items: center;
  font-size: 21px;
`;
const Header: React.FC = () => {
  return <Container>Jerrynim's TodoList</Container>;
};

export default Header;
