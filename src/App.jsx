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

  const onSubmitHandler = async (todo) => {
    await axios.post("http://localhost:4000/todos", todo);
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
    </div>
  );
};

export default App;
