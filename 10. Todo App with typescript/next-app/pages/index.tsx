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
      <TodoList
        todos={[
          { id: 1, content: "마트가서 장보기", color: "red", checked: false },
          { id: 1, content: "마트가서 장보기", color: "navy", checked: false }
        ]}
      />
    </Container>
  );
};

export default app;
