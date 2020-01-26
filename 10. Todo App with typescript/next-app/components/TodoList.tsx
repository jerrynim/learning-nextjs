import React from "react";
import styled from "styled-components";
import { TodoType } from "../types/todo";

const Container = styled.div`
  width: 100%;
  .todo-num {
    margin-left: 12px;
  }
`;

interface Iprops {
  todos: TodoType[];
}

const TodoList: React.FC<Iprops> = ({ todos }) => {
  return (
    <Container>
      <h1>
        남은TODO<span className="todo-num">{todos.length}</span>
      </h1>
    </Container>
  );
};

export default TodoList;
