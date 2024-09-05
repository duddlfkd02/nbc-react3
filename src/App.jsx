// import axios from "axios";
import api from "./axios/api";
import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [editTodo, setEditTodo] = useState({
    title: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get("/todos");
        setTodos(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPost();
  }, []);

  // 추가
  const onSubmitHandler = async (todo) => {
    const { data } = await api.post("/todos", todo);
    setTodos([...todos, data]);
  };

  //삭제
  const onDeleteHandler = async (id) => {
    await api.delete("/todos/" + id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onEditHandler = async (targetId, editTodo) => {
    await api.patch("/todos/" + targetId, editTodo);
    const newTodos = todos.map((todo) => {
      if (todo.id === targetId) {
        return {
          ...todo,
          title: editTodo.title,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <h3>axios 연습</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        {/* 수정 UI */}
        <div>
          <input
            type="text"
            placeholder="수정하고 싶은 Todo Id 입력"
            onChange={(e) => {
              setTargetId(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정할 값 입력"
            onChange={(e) => {
              setEditTodo({ ...editTodo, title: e.target.value });
            }}
          />
          <button
            type="button"
            onClick={() => {
              onEditHandler(targetId, editTodo);
            }}
          >
            수정하기
          </button>
        </div>
        <input
          type="text"
          onChange={(e) => {
            setTodo({ ...todo, title: e.target.value });
          }}
        />
        <button type="submit">추가</button>
      </form>
      {todos?.map((todo) => {
        return (
          <div key={todo.id}>
            <span>{todo.title}</span>{" "}
            <button onClick={() => onDeleteHandler(todo.id)}>삭제</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
