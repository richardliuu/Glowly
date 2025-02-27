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
  
    try {
      const response = await AxiosInstance.post("posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("authToken")}`, // Knox token
        },
      });
      console.log("Post created:", response.data);
      navigate("/posts");
  
      // Reset form fields after successful submission
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      if (error.response) {
        // If error.response exists, it means we got a response with status code other than 2xx
        console.error("Error creating post:", error.response.data);
        setErrorMessage(error.response.data.detail || JSON.stringify(error.response.data));
      } else if (error.request) {
        // If error.request exists, it means the request was made but no response was received
        console.error("No response received:", error.request);
        setErrorMessage("No response received from the server.");
      } else {
        // General error handling for other cases
        console.error("Error creating post:", error.message);
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
