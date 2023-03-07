import { useState } from "react";

function CreatePost({ fetchPosts }: any) {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  async function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      const body = {
        email,
        comment,
      };
      const res = await fetch("http://127.0.0.1:5001/posts", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
      });

      setEmail("");
      setComment("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px",
      }}
    >
      <h3>Create a post</h3>
      <label htmlFor="">Email</label>
      <input value={email} onChange={onEmailChange} placeholder="your email" />

      <label htmlFor="">Comment</label>
      <textarea
        rows={5}
        value={comment}
        onChange={onCommentChange}
        placeholder="your comment"
      />

      <button type="submit" disabled={loading}>
        Create
      </button>
      {loading ? <h4>Creating post...</h4> : null}
    </form>
  );
}

export default CreatePost;
