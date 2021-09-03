import 'App.css';
import { useEffect, useState } from 'react';
import io from "socket.io-client";

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io("/");

    socket.on('connect', event => {
      console.log("connected");
    });

    socket.on('public', msg => {
      setMessages(prev => [msg, ...prev]);
    });

    // ensures we disconnect to avoid memory leaks
    return () => socket.disconnect();
  }, []);

  console.log(messages);

  const list = messages.map((msg, i) => {
    return <li key={i}>{msg}</li>;
  });

  return (
    <div className="App">
      <h1>React App</h1>

      <ul>
        {list}
      </ul>

    </div>
  );
}