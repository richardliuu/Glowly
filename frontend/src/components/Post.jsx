import React from "react";
import "../styles/Post.css"

// Have not yet added a image field for the posts

function Post() {
    const formattedDate = new Date(post.created_at).toLocaleDateString("en-US") 

    return (
        <div className="post-container">
            <p className="post-text"></p>
            <p className="post-date"></p>
            <button className="delete-button" onClick={() => onDelete(post.id)}>
                Delete
            </button>
        </div>
    );
}


export default Post; 