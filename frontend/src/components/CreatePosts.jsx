import React, { useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      await AxiosInstance.post("posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Create a Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: "10px 0" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
