import { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/Post.jsx"
import "../styles/Home.css"

function Home() {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        getPosts()
    }, []);

    const getPosts = () => {
        api
            .get("/api/posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deletePost = (id) => {
        api
            .delete(`/api/posts/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("post deleted!");
                else alert("Failed to delete post.");
                getPosts();
            })
            .catch((error) => alert(error));
    };

    const createPost = (e) => {
        e.preventDefault();
        api
            .post("/api/posts/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Post created!");
                else alert("Failed to make post.");
                getPosts();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Posts</h2>
                {posts.map((post) => (
                    <Post post={post} onDelete={deletePost} key={post.id} />
                ))}
            </div>
            <h2>Create a Post</h2>
            <form onSubmit={createPost}>
                <label htmlFor="text">Text:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;


