import { useMemo, useState } from "react";
import { TodoType } from "../types/todo";
import axios, { AxiosResponse } from "axios";

export default (todos: TodoType[]) => {
  const [localTodos, setLocalTodos] = useState<TodoType[]>(todos);

  //* 색깔 객체 구하기 1
  const colors = useMemo(() => {
    let red = 0;
    let orange = 0;
    let yellow = 0;
    let green = 0;
    let blue = 0;
    let navy = 0;
    localTodos.forEach((todo) => {
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
  }, [localTodos]);

  //* 색깔 객체 구하기 2
  //? useMemo의 과도한 사용을 설명하자
  const getColors = useMemo(() => {
    const colors: any = {};
    localTodos.forEach((todo) => {
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
      await checkTodoAPI(id);
      //* 체크를 적용하는 방법 1(데이터 다시 받기)
      // router.reload();

      //* 체크를 적용하는 방법 2(데이터 다시 받기)
      // router.push("/");

      //* 체크를 적용하는 방법 3(data를 local로 저장하여 사용하기)
      const newTodos = localTodos.map((todo) => {
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
      // router.push("/");

      //* 체크를 적용하는 방법 3(data를 local로 저장하여 사용하기)
      const newTodos = localTodos.filter((todo) => todo.id !== id);
      setLocalTodos(newTodos);
      console.log("삭제했습니다.");
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return {
    localTodos,
    setLocalTodos,
    colors,
    checkTodo,
    deleteTodo,
    getTodoColor,
  };
};
