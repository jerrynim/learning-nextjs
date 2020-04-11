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
};
