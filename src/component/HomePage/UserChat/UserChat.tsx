import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import * as api from "../../../api";

const UserChat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState([]);


  async function fetchingChat(id: string) {
    const oldChat = await api.getChat(id); //should use this to map old chat messages
    return(oldChat.data[0].messages);
  }

  // const messages = [
  //   "Hello How Are You ?",
  //   "i'm fine what are you going to do this summer",
  //   "i'm fine what are you going to do this summer",
  //   "i'm fine what are you going to do this summer",
  //   "Hello How Are You ?",
  //   "i'm fine what are you going to do this summer",
  //   "i'm fine what are you going to do this summer",
  //   "i'm fine what are you going to do this summer",
  //   "Hello How Are You ?",
  //   "i'm fine what are you going to do this summer",
  //   "i'm fine what are you going to do this summer",
  //   "i'm fine what are you going to do this summer",
  //   "Hello How Are You ?",
  //   "i'm fine what are you going to do this summer",
  //   "i'm fine what are you going to do this summer",
  //   "i'm fine what are you going to do this summer",
  // ];


  useEffect(() => {
    const chat = fetchingChat("2");
    // setMessages(chat)
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

      <ul className="user-chat">
        {messages.map((a) => {
          return <li  key={a} className="user-chat-li">{a}</li>;
        })}
      </ul>

    </div>
  );
};

export default UserChat;