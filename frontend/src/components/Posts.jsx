import React, { useEffect, useState } from "react";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
// Import the CSS file for styling
import "../Posts.css";

/**
 * Posts Component
 * 
 * Displays a collection of posts with like and delete functionality
 * Users can also create new posts through this component
 */
const Posts = () => {
  // State to store all posts from the API
  const [posts, setPosts] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Fetches all posts from the backend API
   * Uses Knox token authentication from localStorage
   */
  const fetchPosts = async () => {
    try {
      const response = await AxiosInstance.get("posts/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        }
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  // Run fetchPosts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Handles liking/unliking a post
   * @param {number} postId - The ID of the post to like/unlike
   */
  const handleLike = async (postId) => {
    try {
      await AxiosInstance.post(`posts/${postId}/like/`);
      fetchPosts(); // Refresh posts to update like count
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  /**
   * Handles deleting a post
   * @param {number} postId - The ID of the post to delete
   */
  const handleDelete = async (postId) => {
    try {
      await AxiosInstance.delete(`posts/${postId}/`);
      // Update posts state by filtering out the deleted post
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="posts-container">
      {/* Fixed header section that stays at the top */}
      <div className="posts-header">
        <h1>Posts</h1>
        <button 
          className="create-button"
          onClick={() => navigate("/create-post")}
          aria-label="Create new post"
        >
          Create Post
        </button>
      </div>

      {/* Main content area that scrolls */}
      <div className="posts-content">
        {loading ? (
          // Show loading spinner when data is being fetched
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          // Show message when no posts exist
          <div className="no-posts">
            <p>No posts yet. Be the first to create one!</p>
          </div>
        ) : (
          // Grid layout for displaying multiple posts
          <div className="posts-grid">
            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                {/* Conditional rendering for post image */}
                {post.image && (
                  <div 
                    className="post-image" 
                    style={{ backgroundImage: `url(${post.image})` }}
                    title={post.title}
                  ></div>
                )}
                <div className="post-content">
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <div className="post-meta">
                    <span className="likes-count">
                      {/* Heart icon for likes */}
                      <span className="heart-icon">♥</span>
                      {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
                    </span>
                  </div>
                  <div className="post-actions">
                    {/* Heart button with dynamic styling based on like status */}
                    <button 
                      className={`heart-button ${post.likes.includes(localStorage.getItem("user_id")) ? "liked" : ""}`}
                      onClick={() => handleLike(post.id)}
                      aria-label={post.likes.includes(localStorage.getItem("user_id")) ? "Unlike post" : "Like post"}
                    >
                      ♥
                    </button>
                    {/* Delete button */}
                    <button 
                      className="delete-button"
                      onClick={() => handleDelete(post.id)}
                      aria-label="Delete post"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;