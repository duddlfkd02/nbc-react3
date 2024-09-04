import { useEffect, useState } from "react";

const App = () => {
  // const [message, setMessage] = useState("타이머시작");

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/posts/1")
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));

    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
        response.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
        response.json()
      ),
    ]).then(([response1, response2]) => {
      // 구조분해 할당으로 Promise 병렬처리
      console.log("response1", response1);
      console.log("response2", response2);
    });
  }, []);

  return <div>{/* <h1>{message}</h1> */}</div>;
};

export default App;
