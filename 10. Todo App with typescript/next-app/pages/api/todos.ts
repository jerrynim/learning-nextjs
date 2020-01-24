import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    fs.exists("todos.json", exists => {
      if (exists) {
        //파일이 존재한다면
        fs.readFile("todos.json", (err, data) => {
          if (err) {
            console.log(err);
            throw Error("err");
          } else {
            const todos = JSON.parse(data.toString());
            return res.end(JSON.stringify(todos));
          }
        });
      } else {
        console.log("no data");
        res.status(204).json("데이터가 없습니다.");
      }
    });
  }

  if (req.method === "POST") {
    fs.exists("todos.json", exists => {
      const newTodo = req.body;
      console.log(newTodo);
      if (exists) {
        //파일이 존재한다면
        fs.readFile("todos.json", (err, data) => {
          if (err) {
            console.log(err);
            throw Error("err");
          } else {
            const todos = JSON.parse(data.toString());
            todos.push(newTodo);
            fs.writeFile("todos.json", JSON.stringify(todos), () =>
              console.log("hi")
            );
            return res.end(JSON.stringify(todos));
          }
        });
      } else {
        fs.writeFile("todos.json", JSON.stringify([newTodo]), () =>
          console.log("Hi")
        );
        res.status(200).json([newTodo]);
      }
    });
  }
};
