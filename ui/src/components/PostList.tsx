import { useState } from "react";
import EditPost from "./EditPost";
import Post from "./Post";

interface IPost {
  id: number;
  email: string;
  comment: string;
}

interface IProps {
  posts: IPost[];
  fetchPosts: () => void;
}

function PostList({ posts, fetchPosts }: IProps) {
  const [editing, setEditing] = useState<null | IPost>(null);

  async function deletePost(postID: number) {
    const res = confirm("Are you sure?");
    if (!res) return;
    try {
      await fetch(`http://127.0.0.1:5001/posts/${postID}`, {
        method: "DELETE",
      });
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }

  function onEditClick(post: IPost) {
    setEditing(post);
  }

  async function updatePost(
    postID: Number,
    body: { email: string; comment: string }
  ) {
    try {
      await fetch(`http://127.0.0.1:5001/posts/${postID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setEditing(null);

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <h3>Posts</h3>
      {posts.length ? (
        posts.map((post) => {
          if (editing?.id === post.id) {
            return (
              <EditPost
                key={post.id}
                post={post}
                updatePost={updatePost}
                editing={editing}
                setEditing={setEditing}
              />
            );
          }
          return (
            <Post
              key={post.id}
              deletePost={deletePost}
              onEditClick={onEditClick}
              post={post}
            />
          );
        })
      ) : (
        <span>There are no posts yet...</span>
      )}
    </div>
  );
}

export default PostList;
