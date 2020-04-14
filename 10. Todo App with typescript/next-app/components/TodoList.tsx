import React, { useMemo, useState } from "react";
import styled from "styled-components";
import CountBy from "lodash/Countby";
import toPairs from "lodash/toPairs";
import { TodoType } from "../types/todo";
import BrushIcon from "../public/static/svg/brushIcon.svg";
import { pallete } from "../styles/pallete";
import axios, { AxiosResponse } from "axios";
import { Dictionary } from "lodash";
import todo from "../pages/api/todo";
import CheckMarkIcon from "../public/static/svg/check_mark.svg";
import TrashCanIcon from "../public/static/svg/trash_can.svg";
import { useRouter } from "next/dist/client/router";

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
  const router = useRouter();
  const [localTodos, setLocalTodos] = useState<TodoType[]>();

  //* 색깔 객체 구하기 1
  const colors = useMemo(() => {
    let red = 0;
    let orange = 0;
    let yellow = 0;
    let green = 0;
    let blue = 0;
    let navy = 0;
    todos.forEach((todo) => {
      switch (todo.color) {
        case "red":
          red += 1;
          break;
        case "orange":
          orange += 1;
          break;
        case "yellow":
          yellow += 1;
          break;
        case "green":
          green += 1;
          break;
        case "blue":
          blue += 1;
          break;
        case "navy":
          navy += 1;
          break;
        default:
          break;
      }
    });

    return {
      red,
      orange,
      yellow,
      green,
      blue,
      navy,
    };
  }, [todos]);

  //* 색깔 객체 구하기 2
  //? useMemo의 과도한 사용을 설명하자
  const getColors = useMemo(() => {
    const colors: any = {};
    todos.forEach((todo) => {
      const value: number | undefined = colors[`${todo.color}`];
      if (!value) {
        //* 존재하지않던 key라면
        colors[`${todo.color}`] = 1;
      } else {
        //* 존재하는 키라면
        colors[`${todo.color}`] = value + 1;
      }
    });
  }, [todos]);

  //* 투두의 색깔 className을 리턴한다.
  const getTodoColor = (color: TodoType["color"]) => {
    switch (color) {
      case "blue":
        return "bg-blue";
      case "green":
        return "bg-green";
      case "navy":
        return "bg-navy";
      case "orange":
        return "bg-orange";
      case "red":
        return "bg-red";
      case "yellow":
        return "bg-yellow";
      default:
        return "";
    }
  };

  //* 투두 체크하기 API
  const checkTodoAPI = async (id: number): Promise<AxiosResponse<TodoType[]>> =>
    await axios.patch("/api/todo", { id });

  //* 투두 삭제하기 API
  const deleteTodoAPI = async (id: number): Promise<AxiosResponse<any>> =>
    await axios.delete("/api/todo", { data: { id } });

  //* 투두 체크하기
  const checkTodo = async (id: number) => {
    try {
      const { data } = await checkTodoAPI(id);
      console.log(data);
      //* 체크를 적용하는 방법 1(데이터 다시 받기)
      // router.reload();

      //* 체크를 적용하는 방법 2(데이터 다시 받기)
      router.push("/");

      //* 체크를 적용하는 방법 3(data를 local로 저장하여 사용하기)
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      setLocalTodos(newTodos);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  //*투두 삭제하기
  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      router.push("/");

      console.log("삭제했습니다.");
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은TODO<span>{todos.length}개</span>
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
        {todos.map((todo) => (
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
              {todo.checked ? (
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
              ) : (
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
