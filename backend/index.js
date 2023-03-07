require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { queryDb } = require("./db");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

// READ ALL POSTS
app.get("/posts", async (request, response) => {
  try {
    const res = await queryDb("SELECT * FROM posts");
    response.status(200).json(res.rows);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// CREATE A POST
app.post("/posts", async (request, response) => {
  try {
    const { email, comment } = request.body;
    if (!email || !comment) {
      response.status(409).json({ message: "email and comment required" });
      return;
    }

    await queryDb("INSERT INTO posts (email, comment) VALUES ($1, $2)", [
      email,
      comment,
    ]);

    response.status(200).json({ message: "post created successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// EDIT A POST
app.put("/posts/:postID", async (request, response) => {
  try {
    const { postID } = request.params;
    const { email, comment } = request.body;

    if (!email || !comment || !postID) {
      response.status(409).json({ message: "email and comment required" });
      return;
    }

    await queryDb(
      "UPDATE public.posts SET email=$1, comment=$2 WHERE id = $3",
      [email, comment, postID]
    );
    response.status(200).json({ message: "post updated successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// DELETE A POST
app.delete("/posts/:postID", async (request, response) => {
  try {
    const { postID } = request.params;
    if (!postID) {
      response.status(409).json({ message: "post id required" });
      return;
    }

    await queryDb("DELETE FROM posts WHERE id = $1", [postID]);
    response.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on port [${PORT}]`);
});
