import React, { useMemo, useState } from "react";
import styled from "styled-components";
import CountBy from "lodash/Countby";
import toPairs from "lodash/toPairs";
import { TodoType } from "../types/todo";
import BrushIcon from "../public/static/svg/brush.svg";
import { pallete } from "../styles/pallete";
import axios, { AxiosResponse } from "axios";
import { Dictionary } from "lodash";
import todo from "../pages/api/todo";
import CheckMarkIcon from "../public/static/svg/check_mark.svg";
import TrashCanIcon from "../public/static/svg/trash_can.svg";
import { useRouter } from "next/dist/client/router";
import useTodo from "../hooks/useTodo";

const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${pallete.gray};

    .brush-icon {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .todo-list-last-todo {
      font-size: 14px;
      margin: 0 0 8px;
      span {
        margin-left: 12px;
      }
    }

    .todo-list-header-colors {
      display: flex;
      .todo-list-header-color-num {
        display: flex;
        margin-right: 8px;
        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0;
          margin-left: 6px;
        }
        .todo-list-header-round-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }

  .todo-list {
    height: calc(100vh - 168px);
    overflow-y: scroll;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 52px;
      padding-right: 12px;
      border-bottom: 1px solid ${pallete.gray};

      .todo-left-side {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .todo-color-block {
          width: 12px;
          height: 100%;
        }
        .checked-todo-text {
          color: ${pallete.gray};
          text-decoration: line-through;
        }
        .todo-content {
          margin-left: 12px;
          font-size: 16px;
          /** 많은양의 텍스트를 처리하는 방법 1 */
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .todo-right-side {
        display: flex;
        svg {
          &:first-child {
            margin-right: 16px;
          }
        }
        .svg-red {
          path {
            fill: ${pallete.deep_red};
          }
        }
        .svg-green {
          fill: ${pallete.deep_green};
        }
      }

      .todo-button {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid ${pallete.gray};
        background-color: transparent;
        outline: none;
      }
    }
  }
`;

interface Iprops {
  todos: TodoType[];
}

const TodoList: React.FC<Iprops> = ({ todos }) => {
  const {
    localTodos,
    setLocalTodos,
    colors,
    checkTodo,
    deleteTodo,
    getTodoColor,
  } = useTodo(todos);

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은TODO<span>{localTodos.length}개</span>
        </p>
        <BrushIcon className="brush-icon" />
        <div className="todo-list-header-colors">
          {(Object.keys(colors) as TodoType["color"][]).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div
                className={`todo-list-header-round-color ${getTodoColor(
                  color
                )}`}
              />
              <p>{colors[color]}개</p>
            </div>
          ))}
        </div>
      </div>
      <ul className="todo-list">
        {localTodos.map((todo) => (
          <li key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block ${getTodoColor(todo.color)}`} />
              <p
                className={`todo-content ${
                  todo.checked ? "checked-todo-text" : ""
                }`}
              >
                {todo.content}
              </p>
            </div>
            <div className="todo-right-side">
              {todo.checked && (
                <>
                  <TrashCanIcon
                    className="svg-red"
                    onClick={() => deleteTodo(todo.id)}
                  />
                  <CheckMarkIcon
                    className="svg-green"
                    onClick={() => checkTodo(todo.id)}
                  />
                </>
              )}
              {!todo.checked && (
                <button
                  className="todo-button"
                  onClick={() => checkTodo(todo.id)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
