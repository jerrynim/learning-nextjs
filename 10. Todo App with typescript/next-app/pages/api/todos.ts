import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    fs.exists("todos.json", (exists) => {
      if (exists) {
        //* 파일이 존재한다면
        fs.readFile("todos.json", (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send("에러가 발생했습니다.");
          } else {
            const todos = JSON.parse(data.toString());
            res.send(JSON.stringify(todos));
          }
        });
      } else {
        console.log("데이터가 없습니다.");
        res.status(404).json("데이터가 없습니다.");
      }
    });
  }
};
