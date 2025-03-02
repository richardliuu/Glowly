import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    const userMessage = { role: "user", content: message };

    // Add user message to chat
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chat/", {
        message,
      });

      const botMessage = { role: "assistant", content: response.data.reply };

      // Add bot response to chat
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setChatHistory((prev) => [...prev, { role: "assistant", content: "Error: Could not connect to chatbot." }]);
    }

    setMessage("");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>🤖 AI Chatbot</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
        {chatHistory.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        style={{ padding: "10px", width: "100%", marginTop: "10px" }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: "10px", marginTop: "5px" }}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default Chatbot;
