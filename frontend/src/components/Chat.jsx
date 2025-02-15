import { useState } from "react";
import useWebsocket from "."
// Need to define a websocket file to import it 


const Chat = ({ roomName, Username }) => {
    const { messages, sendMessage} = useWebsocket(roomName, username)
    const [ message, setMessage] = useState("")
}





export default Chat 