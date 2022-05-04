import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as api from "../../api";

import { io, Socket } from "socket.io-client";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import UserChat from "./UserChat/UserChat";

import { Badge, Box, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserInfo from "./UserInfo/UserInfo";

import Avatar from "@mui/material/Avatar";
import logo from "../images/avatar.png";
import AddConversation from "./AddConversation";

const HomePage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(0);
  const [loading, setLoading] = useState(true)

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
  console.log("chatId", chatId);

  const token = useSelector((state: RootState) => state.app.token);
  async function fetchUser(token: string) {
    try {
      setLoading(true);
      const response = await api.getUser(token);
      const userId = response.data.user.id;
      if(userId){
        setUserId(userId);
        fetchChats(userId);
      }
    } catch (error) {
    }
    finally {
      setLoading(false);
    }
  }
  //need to add an else

  const localToken = token || localStorage.getItem("token") || "";
  useEffect(() => {
    fetchUser(localToken);
    const socket: Socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(socket);
  }, []);

  const formik = useFormik({
    initialValues: {
      message: "",
    },

    onSubmit: async (values) => {
      const request = socket?.emit("message", values.message);
      const response = await api.sendMessage(
        values.message,
        userId ? userId : 0,
        chatId ? chatId : 0
      );
      formik.resetForm();
    },
    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
  });

  const changeChat = (item: any) => {
    setCurrentChat(item);
    setCurrentSelected(item.id);
    setChatId(item.id);

  };
  
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      <div className="home">
        <div className="messages">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h2>Messages</h2>
            <AddConversation userId={userId ? userId : 0} />
          </Box>
          {chats.map((item: any, index) => {
            return (
              <div
                key={index}
                className={`user-message-avatar ${
                  item.id == currentSelected ? "selected" : ""
                }`}
                onClick={() => changeChat(item)}
              >
                <div className="user-avatar">
                  <Badge
                    color="success"
                    badgeContent=" "
                    variant="dot"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      alt="Cindy Baker"
                      src={logo}
                      sx={{ width: 70, height: 70 }}
                    />
                  </Badge>
                </div>

                <div className="user-info">
                  <span className="user-name">
                    <h4>{item.users[1].name}</h4>
                    <span className="time">
                      {item.messages.length === 0
                        ? Date()
                        : item.messages[item.messages.length - 1].dateCreated}
                    </span>
                  </span>
                  <span className="user-msg">
                    {item.messages.length === 0
                      ? "new chat"
                      : item.messages[item.messages.length - 1].message}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chat">
          <div className="chatInput">
            <UserInfo currentChat={currentChat} />
            <UserChat chatId={chatId} />
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
    </div>
  );
};

export default HomePage;
