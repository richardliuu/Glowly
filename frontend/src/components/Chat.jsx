import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get Knox token
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    const socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${roomName}/?token=${token}`
    );

    socket.onopen = () => console.log("WebSocket Connected");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      setTimeout(() => {
        console.log("Reconnecting WebSocket...");
        setWs(new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/?token=${token}`));
      }, 3000); // Reconnect after 3 seconds
    };

    setWs(socket);

    return () => {
      socket.close();
      console.log("WebSocket Cleanup");
    };
  }, [roomName]);

  const sendMessage = () => {
    if (ws && message.trim()) {
      ws.send(JSON.stringify({ message, name: "User1" })); // Replace "User1" with the actual username if needed
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat Room: {roomName}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;

