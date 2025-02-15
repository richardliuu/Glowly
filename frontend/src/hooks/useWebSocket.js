import { useState, useEffect } from "react";

const useWebsocket = (roomName) => {
    const [messages, setMessages] = useState([]);
    const socketUrl = `ws://localhost:8000/ws/chat/${roomName}/`;

    useEffect(() => {
        const socket = new WebSocket(socketUrl);
    
        socket.onopen = () => {
          console.log("WebSocket Connected");
        };
    
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setMessages((prev) => [...prev, data.message]);
        };
    
        socket.onclose = () => {
          console.log("WebSocket Disconnected");
        };
    
        return () => socket.close();
      }, [socketUrl]);
    
      const sendMessage = (message) => {
        const socket = new WebSocket(socketUrl);
        socket.onopen = () => socket.send(JSON.stringify({ message }));
      };
    
      return { messages, sendMessage };
    };


export default useWebsocket;