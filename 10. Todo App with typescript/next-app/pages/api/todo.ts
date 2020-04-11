import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { TodoType } from "../../types/todo";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { id } = req.body;
    if (!id) {
      //* id 가 없다면
      res.status(400).send({ status: 400, message: "id 가 없습니다." });
      return;
    }
    try {
      fs.exists("todos.json", (exists) => {
        if (exists) {
          //* 파일이 존재한다면
          fs.readFile("todos.json", (err, data) => {
            if (err) {
              console.log(err);
              throw Error(err.message);
            } else {
              const todos: TodoType[] = JSON.parse(data.toString());
              const updatedTodo = todos.map((todo) => {
                if (todo.id === id) {
                  return { ...todo, checked: !todo.checked };
                }
                return todo;
              });
              fs.writeFile("todos.json", JSON.stringify(updatedTodo), () =>
                console.log("hi")
              );
              return res.end(JSON.stringify(updatedTodo));
            }
          });
        } else {
          console.log("no data");
          res.status(204).json("데이터가 없습니다.");
        }
      });
    } catch (e) {
      console.warn(e.message);
    }
  }

  if (req.method === "PUT") {
    fs.exists("todos.json", (exists) => {
      const { content, color } = req.body;
      if (!content || !color) {
        res
          .status(400)
          .send({ status: 400, message: "content나 color 가 없습니다." });
        return;
      }
      if (exists) {
        //* 파일이 존재한다면
        fs.readFile("todos.json", (err, data) => {
          if (err) {
            console.log(err);
            throw Error("err");
          } else {
            const todos = JSON.parse(data.toString());
            const newToDo: TodoType = {
              id: todos[todos.length - 1].id + 1,
              color,
              content,
              checked: false,
            };
            todos.push(newToDo);
            fs.writeFile("todos.json", JSON.stringify(todos), () =>
              console.log("hi")
            );
            return res.end(JSON.stringify(todos));
          }
        });
      } else {
        const newToDo: TodoType = {
          id: 1,
          color,
          content,
          checked: false,
        };
        fs.writeFile("todos.json", JSON.stringify([newToDo]), () =>
          console.log("Hi")
        );
        res.status(200).json([newToDo]);
      }
    });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      //* id 가 없다면
      res.status(400).send({ status: 400, message: "id 가 없습니다." });
      return;
    }
    try {
      fs.exists("todos.json", (exists) => {
        if (exists) {
          //* 파일이 존재한다면
          fs.readFile("todos.json", (err, data) => {
            if (err) {
              console.log(err);
              throw Error(err.message);
            } else {
              const todos: TodoType[] = JSON.parse(data.toString());
              const updatedTodo = todos.filter((todo) => todo.id !== id);
              fs.writeFile("todos.json", JSON.stringify(updatedTodo), () =>
                console.log("hi")
              );
              return res.end(JSON.stringify(updatedTodo));
            }
          });
        } else {
          console.log("no data");
          res.status(204).json("데이터가 없습니다.");
        }
      });
    } catch (e) {
      console.warn(e.message);
    }
  }
};
