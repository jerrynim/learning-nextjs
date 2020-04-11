import React, { useState } from "react";
import styled from "styled-components";
import BrushIcon from "../public/static/svg/brushIcon.svg";
import { pallete } from "../styles/pallete";
import axios, { AxiosResponse } from "axios";
import lodash from "lodash/flatten";
import fp from "lodash/fp/flatten";
import { TodoType } from "../types/todo";

const Container = styled.div`
  padding: 16px;

  .add-todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 4px 8px;
      border: 1px solid black;
      border-radius: 5px;
      background-color: white;
      outline: none;
      font-size: 14px;
    }
  }
  .add-todo-colors-wrapper {
    width: 100%;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
  }
  .add-todo-color-list {
    display: flex;
    li {
      width: 24px;
      height: 24px;
      margin-right: 16px;
      border-radius: 50%;
      &:last-child {
        margin: 0;
      }
    }
    .add-todo-selected-border {
      border: 2px solid black;
    }
  }
  h1 {
    font-size: 21px;
  }

  textarea {
    width: 100%;
    border-radius: 5px;
    height: 300px;
    border-color: ${pallete.gray};
    margin-top: 12px;
    resize: none;
    outline: none;
    padding: 12px;
    font-size: 16px;
  }
`;

const AddTodo: React.FC = () => {
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState<TodoType["color"]>();

  //* 투두 추가하기 Params type
  interface AddToDoParams {
    content: string;
    color: TodoType["color"];
  }
  //* 투두 추가하기 API
  const addTodoAPI = (
    data: AddToDoParams
  ): Promise<AxiosResponse<TodoType[]>> => axios.put("/api/todo", data);

  //*투두 추가하기
  const addTodo = async () => {
    try {
      if (content === "" || !selectedColor) {
        console.log("항목을 입력해주세요.");
        return;
      }
      await addTodoAPI({ content, color: selectedColor });

      console.log("추가했습니다.");
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return (
    <Container>
      <div className="add-todo-header">
        <h1>Add ToDo</h1>
        <button className="add-todo-submit-button" onClick={() => addTodo()}>
          추가하기
        </button>
      </div>
      <div className="add-todo-colors-wrapper">
        <ul className="add-todo-color-list">
          {["red", "orange", "yellow", "green", "blue", "navy"].map(
            (color, index) => (
              <li
                className={`bg-${color} ${
                  color === selectedColor ? "add-todo-selected-border" : ""
                }`}
                key={index}
                onClick={() => setSelectedColor(color as TodoType["color"])}
              />
            )
          )}
        </ul>
        <BrushIcon />
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    </Container>
  );
};

export default AddTodo;
