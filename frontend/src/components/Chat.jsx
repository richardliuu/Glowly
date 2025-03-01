import { useState, useEffect } from "react";

const Chat = ({ roomName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get Knox token from local storage
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
    socket.onclose = () => console.log("WebSocket Disconnected");

    setWs(socket);

    return () => socket.close();
  }, [roomName]);

  const sendMessage = () => {
    if (ws && message.trim()) {
      ws.send(JSON.stringify({ message, name: "User1" }));
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
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
