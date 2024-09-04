import { useEffect, useState } from "react";

const App = () => {
  // const [message, setMessage] = useState("타이머시작");

  // useEffect(() => {
  //   const delay = (ms) => {
  //     const promise = new Promise((resolve) => {
  //       setTimeout(resolve, ms);
  //     });
  //     return promise;
  //   };
  //   delay(2000).then(() => {
  //     setMessage("2초 후 메시지 변경 완료");
  //   });
  // }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  return <div>{/* <h1>{message}</h1> */}</div>;
};

export default App;
