import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState({
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

  return (
    <div>
      <h3>axios 연습</h3>
      <form
        onSubmit={(e) => {
          // alert("test");
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
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
