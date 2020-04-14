import { useRouter } from "next/dist/client/router";
import { TodoType } from "../types/todo";
import Axios, { AxiosResponse } from "axios";

export default () => {
  const router = useRouter();
  //* 투두 추가하기 Params type
  interface AddToDoParams {
    content: string;
    color: TodoType["color"];
  }
  //* 투두 추가하기 API
  const addTodoAPI = (
    data: AddToDoParams
  ): Promise<AxiosResponse<TodoType[]>> => Axios.put("/api/todo", data);

  //*투두 추가하기
  const addTodo = async ({
    content,
    selectedColor,
  }: {
    content: string;
    selectedColor: TodoType["color"] | undefined;
  }) => {
    try {
      if (content === "" || !selectedColor) {
        console.log("항목을 입력해주세요.");
        return;
      }
      await addTodoAPI({ content, color: selectedColor });

      console.log("추가했습니다.");

      router.push("/");
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  return { addTodo };
};
