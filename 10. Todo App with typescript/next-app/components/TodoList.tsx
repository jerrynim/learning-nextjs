import React, { useMemo } from "react";
import styled from "styled-components";
import { TodoType } from "../types/todo";
import BrushIcon from "../public/static/svg/brushIcon.svg";
import CountBy from "lodash/countBy";
import toPairs from "lodash/toPairs";
import { color } from "../styles/color";

const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  .list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${color.gray};

    .brush-icon {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .last-todo {
      font-size: 14px;
      margin: 0 0 8px;

      .todo-num {
        margin-left: 12px;
      }
    }

    .colors {
      display: flex;
      .color-num {
        display: flex;
        margin-right: 8px;
        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0;
          margin-left: 6px;
        }
      }
    }
  }
`;

const Color = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => color[props.color]};
`;

interface Iprops {
  todos: TodoType[];
}

const TodoList: React.FC<Iprops> = ({ todos }) => {
  const colors = useMemo(() => toPairs(CountBy(todos, "color")), [todos]);
  return (
    <Container>
      <div className="list-header">
        <p className="last-todo">
          남은TODO<span className="todo-num">{todos.length}개</span>
        </p>
        <BrushIcon className="brush-icon" />
        <div className="colors">
          {colors.map(color => (
            <div className="color-num">
              <Color color={color[0]} />
              <p>{color[1]}개</p>
            </div>
          ))}
        </div>
      </div>
      <div className="todo-list">
        {todos.map(todo => (
          <div>
            <div className="color" />
            <div className="todo-item">
              <p>{todo.content}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TodoList;
