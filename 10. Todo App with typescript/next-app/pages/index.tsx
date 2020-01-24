import React from "react";
import { NextPage } from "next";
import axios from "axios";

const app: NextPage = () => {
  return (
    <div>
      <button
        onClick={() => axios.get("/api/todos").then(res => console.log(res))}
      >
        get todos
      </button>
      <button
        onClick={() =>
          axios
            .post("/api/todos", {
              id: 1,
              content: "마트가서 장보기",
              color: "red"
            })
            .then(res => console.log(res))
        }
      >
        add todo
      </button>
    </div>
  );
};

export default app;
