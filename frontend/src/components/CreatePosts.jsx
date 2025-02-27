import React, { useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // For handling error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous error message

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    // 🔎 Debugging: Log FormData contents before making the request
    console.log("🔍 FormData Debug:", {
      title,
      content,
      image: image ? image.name : "No image uploaded",
    });

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        setErrorMessage("Authentication token is missing. Please log in.");
        return;
      }

      const response = await AxiosInstance.post("posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${authToken}`, // Knox token
        },
      });

      console.log("✅ Post created successfully:", response.data);
      navigate("/posts");

      // Reset form fields after successful submission
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      if (error.response) {
        // 🔎 Debugging: Log response errors
        console.error("🚨 Error creating post:", error.response.data);
        setErrorMessage(error.response.data.detail || JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error("⚠️ No response from server:", error.request);
        setErrorMessage("No response received from the server.");
      } else {
        console.error("❌ Unexpected error:", error.message);
        setErrorMessage("An unexpected error occurred.");
      }
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
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;

