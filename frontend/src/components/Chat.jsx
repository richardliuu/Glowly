import { useState } from "react";
import useWebsocket from "../hooks/useWebsocket";

const Chat = ({ roomName, Username }) => {
    const { messages, sendMessage} = useWebSocket(roomName)
    const [ message, setMessage] = useState("")

    return (
        <div>
            <h2>Chat Room: {roomName}</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => sendMessage(message)}>Send</button>
        </div>
    );
};

export default Chat; 