import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState(null);

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

  return (
    <div>
      <h3>axios 연습</h3>
      {/* {todos ? <div>{todos.title}</div> : <div>Loading...</div>} */}
    </div>
  );
};

export default App;
