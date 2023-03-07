import { useEffect, useState } from "react";

interface IPost {
  id: number;
  email: string;
  comment: string;
}

interface IProps {
  updatePost: (
    postID: number,
    body: { email: string; comment: string }
  ) => void;
  post: IPost;
  setEditing: (state: null | IPost) => void;
  editing: null | IPost;
}

function EditPost({ updatePost, post, setEditing, editing }: IProps) {
  const [email, setEmail] = useState(editing?.email || "");
  const [comment, setComment] = useState(editing?.comment || "");

  useEffect(() => {
    setEmail(editing?.email || "");
    setComment(editing?.comment || "");
  }, [editing]);

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  function resetValues() {
    setEditing(null);
    setEmail("");
    setComment("");
  }

  return (
    <div
      style={{
        marginBottom: 40,
        display: "flex",
        boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px",
        padding: 20,
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          maxWidth: 700,
          gap: "4px",
        }}
      >
        <label htmlFor="">Email</label>
        <input value={email} onChange={onEmailChange} />
        <label htmlFor="">Comment</label>
        <textarea rows={5} value={comment} onChange={onCommentChange} />

        <div>
          <button onClick={() => updatePost(post.id, { comment, email })}>
            Send
          </button>
          <button onClick={resetValues}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
