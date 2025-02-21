import React, { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await AxiosInstance.get("posts/");
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await AxiosInstance.post(`posts/${postId}/like/`);
      fetchPosts(); // Refresh posts to update like count
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await AxiosInstance.delete(`posts/${postId}/`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" color="primary" onClick={() => navigate("/create-post")}>
        Create Post
      </Button>

      {loading ? (
        <Typography>Loading posts...</Typography>
      ) : (
        posts.map((post) => (
          <Card key={post.id} sx={{ my: 2 }}>
            {post.image && (
              <CardMedia component="img" height="140" image={post.image} alt="Post Image" />
            )}
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>
              <Typography variant="body1">{post.content}</Typography>
              <Typography variant="caption">Likes: {post.likes.length}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => handleLike(post.id)}>
                  {post.likes.includes(localStorage.getItem("user_id")) ? "Unlike" : "Like"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                  sx={{ ml: 2 }}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Posts;
