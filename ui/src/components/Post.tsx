interface IPost {
  id: number;
  email: string;
  comment: string;
}

interface IProps {
  onEditClick: (post: IPost) => void;
  deletePost: (postID: number) => void;
  post: IPost;
}

function Post({ onEditClick, deletePost, post }: IProps) {
  return (
    <div
      style={{
        gap: 20,
        marginBottom: 40,
        display: "grid",
        gridTemplateColumns: "60px 1px auto",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <button onClick={() => onEditClick(post)}>Edit</button>
        <button onClick={() => deletePost(post.id)}>Delete</button>
      </div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          background: "rgba(0, 0, 0, 0.14)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>{post.email}</span>
        <span
          style={{
            margin: "10px",
          }}
        >
          {post.comment}
        </span>
      </div>
    </div>
  );
}

export default Post;
