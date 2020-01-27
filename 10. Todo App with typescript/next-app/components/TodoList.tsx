import React from "react";
import styled from "styled-components";
import { TodoType } from "../types/todo";
import BrushIcon from "../public/static/svg/brushIcon.svg";

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
      <div>
        <h1>
          남은TODO<span className="todo-num">{todos.length}</span>
        </h1>
        <BrushIcon />
      </div>
    </Container>
  );
};

export default TodoList;
