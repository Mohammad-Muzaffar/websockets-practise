import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setMessages((m) => [...m, message.data]);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  if (!socket) {
    return <h1>Connecting to socket ....</h1>;
  }

  return (
    <>
      <div>
        <label>Send Message:</label>
        <hr />
        <input
          type="text"
          placeholder="message.."
          onChange={(e) => setMessage(e.target.value)}
        />
        <hr />
        <button onClick={() => socket?.send(message)}>Send</button>
      </div>
      <div>
        <h2>Messages:</h2>
        {messages.map((m) => (
          <h4>{m}</h4>
        ))}
      </div>
    </>
  );
}

export default App;
