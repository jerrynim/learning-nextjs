import React from "react";
import { NextPage } from "next";
import axios from "axios";
import styled from "styled-components";
import TodoList from "../components/TodoList";

const Container = styled.div`
  width: 100%;
`;
const app: NextPage = () => {
  return (
    <Container>
      <TodoList todos={[]} />
    </Container>
  );
};

export default app;
