import axios from "axios";
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
        const { data } = await axios.get("http://localhost:4000/todos");
        // const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPost();
  }, []);
  console.log("🚀 ~ App ~ todos:", todos);

  // 추가
  const onSubmitHandler = async (todo) => {
    const { data } = await axios.post("http://localhost:4000/todos", todo);
    //console.log("response", response)
    // -> 응답 데이터 확인 data 있고 그 안에 자동으로 생성된 id 확인
    // -> 구조분해할당으로 { data } 로 담은 후 setTodos에 넣음
    // 끝나고 나면
    setTodos([...todos, data]);
  };

  //삭제
  const onDeleteHandler = async (id) => {
    await axios.delete("http://localhost:4000/todos/" + id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onEditHandler = async (targetId, editTodo) => {
    await axios.patch("http://localhost:4000/todos/" + targetId, editTodo);
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
