import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import * as api from "../../../api";

const UserChat = ({chatId}: any) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);

  async function fetchingChat(id: number) {
    const oldChat = await api.getChat(id); //should use this to map old chat messages
    const chat = oldChat.data[0].messages
    //console.log(chat);
    setOldMessages(chat);
  }

  useEffect(() => {
    fetchingChat(chatId);
    const socket: Socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(socket);
  }, [chatId]);

  socket?.on("new message", (message) => {
    setMessages(messages ? [...messages, message] : message);
  });

  return (
    <div>

      <ul className="user-chat">
      {oldMessages.map((a:any) => {
          return <li  key={a.id} className="user-chat-li">{a.message}</li>;
        })}
        {messages.map((a) => {
          return <li  key={a} className="user-chat-li">{a}</li>;
        })}
      </ul>

    </div>
  );
};

export default UserChat;