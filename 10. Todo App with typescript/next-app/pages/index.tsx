import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import TodoList from "../components/TodoList";
import axios from "axios";
import { TodoType } from "../types/todo";

const Container = styled.div`
  width: 100%;
`;

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  return (
    <Container>
      <TodoList todos={todos} />
    </Container>
  );
};

app.getInitialProps = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/todos");
    return { todos: data };
  } catch (e) {
    console.log(e.message);
    return { todos: [] };
  }
};

export default app;
