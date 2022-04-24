import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as api from "../../api";

import { io, Socket } from "socket.io-client";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import UserChat from "./UserChat/UserChat";

import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserInfo from "./UserInfo/UserInfo";

import Avatar from "@mui/material/Avatar";
import logo from "../images/avatar.png";

const HomePage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(0);

  async function fetchChats(id: number) {
    const apiChats = await api.getChats(id);
    const conversations = apiChats.data[0].conversations;
    setChats(conversations);
    console.log("chats", conversations);

  }
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [chatId, setChatId] = useState<number | null>(null);

  console.log("user", userId);
  console.log("chatId", chatId)

  const token = useSelector((state: RootState) => state.app.token);
  async function fetchUser(token: string) {
    const response = await api.getUser(token);
    const userId = response.data.user.id
    setUserId(userId);
    fetchChats(userId)
  }

  const localToken = token || localStorage.getItem("token") || "";
  useEffect(() => {
    fetchUser(localToken);
    const socket: Socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    //fetchChats(userId? userId : 0); //use to map chats on the left
    setSocket(socket);
  }, []);

  const formik = useFormik({
    initialValues: {
      message: "",
    },

    onSubmit: async (values) => {
      const request = socket?.emit("message", values.message);
      console.log(request);
      formik.resetForm();
      // console.log(values.message);
      const response = await api.sendMessage(values.message, userId? userId : 0, chatId? chatId : 0);
      console.log(response);
    },
    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
  });

  const changeChat = (item :any) => {
    setCurrentChat(item);
    setCurrentSelected(item.id);
    setChatId(item.id)
    
    console.log('uhuhuhuhgu',item)
  }

  return (
    <div className="container">
      <div className="home">
        <div className="messages">
          <h2>Messages</h2>
          {chats.map((item: any, index) => {
            return (
              <div key={index} className={`user-message-avatar ${item.id == currentSelected ? "selected" : ""}`}  onClick={() => changeChat(item)}>

                <div className="user-avatar">
                  <Avatar
                    alt="Cindy Baker"
                    src={logo}
                    sx={{ width: 70, height: 70 }}
                  />
                </div>
                <div className="user-info">
                  <span className="user-name">
                    <h4>{item.users[1].name}</h4>
                    <span className="time">{item.messages[item.messages.length-1].dateCreated}</span>
                  </span>
                  <span className="user-msg">{item.messages[item.messages.length-1].message}</span>
                </div>
              </div>
            );
          })}
          {/* {chats.map((item:any) => { 
              return <UserMessage key={item.id} {...item} />;
            })
          }) */}
        </div>
        <div className="chat">
          <div className="chatInput">

            <UserInfo currentChat={currentChat} chatId={chatId} />
            <UserChat />
          </div>

          <div className="chatField">
            <form onSubmit={formik.handleSubmit} className="chat-form">
              <TextField
                name="message"
                onBlur={formik.handleBlur}
                value={formik.values.message}
                onChange={formik.handleChange}
                className="chat-input"
                fullWidth
                id="fullWidth"
              />
              <IconButton type="submit" className="send-button">
                <SendIcon className="send-icon" />
              </IconButton>
            </form>
          </div>
        </div>
      </div>

      {/* <div>
        <h1>HomePage</h1>
        <h4>{token || localStorage.getItem("token")}</h4>
        <h6>{user?.name}</h6>
        </div> */}
    </div>
  );
};

export default HomePage;
