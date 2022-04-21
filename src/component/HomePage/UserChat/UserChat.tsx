import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import * as api from "../../../api";

const UserChat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState([]);

  async function fetchingChat(id: string) {
    const oldChat = await api.getChat(id); //should use this to map old chat messages
    console.log(oldChat);
  }

  useEffect(() => {
    fetchingChat("2");
    const socket: Socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(socket);
  }, []);

  socket?.on("new message", (message) => {
    setMessages(messages ? [...messages, message] : message);
  });

  return (
    <div>
      {messages.map((a) => {
        return <div key={a}>{a}</div>;
      })}
    </div>
  );
};

export default UserChat;