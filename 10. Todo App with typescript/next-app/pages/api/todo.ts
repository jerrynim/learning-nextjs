import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { TodoType } from "../../types/todo";

export default (req: NextApiRequest, res: NextApiResponse) => {
  //* checked 변경하기
  if (req.method === "PATCH") {
    const { id } = req.body;
    if (!id) {
      //* id 가 없다면
      res.status(400).send("id 가 없습니다.");
      //! 마지막이 아니니 리턴
      return;
    }
    fs.exists("todos.json", (exists) => {
      //* 파일이 없다면
      if (!exists) {
        console.log("no data");
        res.status(404).json("데이터가 없습니다.");
      }
      fs.readFile("todos.json", (err, data) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }

        const todos: TodoType[] = JSON.parse(data.toString());
        const updatedTodo = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, checked: !todo.checked };
          }
          return todo;
        });
        fs.writeFile("todos.json", JSON.stringify(updatedTodo), (err) => {
          if (err) {
            res.status(500).send(err.message);
          }
        });
        res.send(JSON.stringify(updatedTodo));
      });
    });
  }

  //* 투두 생성하기
  if (req.method === "PUT") {
    fs.exists("todos.json", (exists) => {
      const { content, color } = req.body;
      if (!content || !color) {
        res.status(400).send("content나 color 가 없습니다.");
        return;
      }
      if (!exists) {
        const newTodo: TodoType = {
          id: 1,
          color,
          content,
          checked: false,
        };
        fs.writeFile("todos.json", JSON.stringify([newTodo]), (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.json([newTodo]);
      }
      //* 파일이 존재한다면
      fs.readFile("todos.json", (err, data) => {
        if (err) {
          console.log(err.message);
          res.status(500).send(err.message);
        }

        const todos = JSON.parse(data.toString());
        const newTodoId =
          todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
        const newTodo: TodoType = {
          id: newTodoId,
          color,
          content,
          checked: false,
        };
        todos.push(newTodo);
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
          if (err) {
            res.status(500).send(err.message);
          }
        });
        res.end(JSON.stringify(todos));
        return;
      });
    });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      //* id 가 없다면
      res.status(400).send("id 가 없습니다.");
      return;
    }

    fs.exists("todos.json", (exists) => {
      if (!exists) {
        console.log("no data");
        res.status(404).json("데이터가 없습니다.");
      }
      //* 파일이 존재한다면
      fs.readFile("todos.json", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
        }
        const todos: TodoType[] = JSON.parse(data.toString());
        const updatedTodo = todos.filter((todo) => todo.id !== id);
        fs.writeFile("todos.json", JSON.stringify(updatedTodo), (err) => {
          if (err) {
            res.status(500).send(err.message);
          }
        });
        res.send(JSON.stringify(updatedTodo));
      });
    });
  }
};
