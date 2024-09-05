import { useEffect, useState } from "react";

const App = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPost();
  }, []);
  // console.log("🚀 ~ App ~ post:", post);

  return (
    <div>
      <h3>async / await 연습</h3>
      {post ? <div>{post.title}</div> : <div>Loading...</div>}
    </div>
  );
};

export default App;
