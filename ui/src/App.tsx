import { useEffect, useState } from "react";
import "./App.css";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

interface Post {
  id: number;
  email: string;
  comment: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchPosts() {
    try {
      const res = await fetch("http://127.0.0.1:5001/posts");
      const obj = await res.json();
      setPosts(obj);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1px auto",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <CreatePost fetchPosts={fetchPosts} />
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          background: "rgba(0, 0, 0, 0.14)",
        }}
      />
      <PostList posts={posts} fetchPosts={fetchPosts} />
    </div>
  );
}

export default App;
