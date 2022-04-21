import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducer/app";
import { RootState } from "../../redux/store";
import * as api from "../../api";

import { io, Socket } from "socket.io-client";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import UserMessage from "./UserMessage/UserMessage";
import UserChat from "./UserChat/UserChat";

import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserInfo from "./UserInfo/UserInfo";

const HomePage = () => {
  type name = {
    name: string;
  };

  const data = [
    {
      id: 1,
      name: "mahmoud",
      msg: "really yhat's great let's discuss how to do this very soon",
      time: "10:34pm",
    },
    {
      id: 2,
      name: "mahmoud",
      msg: "really yhat's great let's discuss how to do this very soon",
      time: "10:34pm",
    },
    {
      id: 3,
      name: "mahmoud",
      msg: "really yhat's great let's discuss how to do this very soon",
      time: "10:34pm",
    },
    {
      id: 4,
      name: "mahmoud",
      msg: "really yhat's great let's discuss how to do this very soon",
      time: "10:34pm",
    },
  ];

  async function fetchChats(id:string){
    const chats = await api.getChats(id);
    console.log(chats)
  }
  const [socket, setSocket] = useState<Socket | null>(null);

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.app.token);
  async function fetchUser(token: string) {
    const response = await api.getUser(token);
    dispatch(setUser(response.data.user)); 
  }

  const localToken = token || localStorage.getItem("token") || "";
  useEffect(() => {
    fetchUser(localToken);
    fetchChats("1"); //use to map chats on the left 
    const socket: Socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(socket);
  }, []);

  const user = useSelector((state: RootState) => state.app.user);
  console.log(user); //user data

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    
    onSubmit: async (values) => {
      const request = socket?.emit("message",values.message);

      console.log(request);
      formik.resetForm();
      console.log(values.message);
      const response = await api.sendMessage(values.message, 1, "2")
      console.log(response);
    },
    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
  });

  return (
    <div className="container">
      <div className="home">
        <div className="messages">
          <h2>Messages</h2>
          {data.map((item) => { 
            return <UserMessage key={item.id} {...item} />;
          })}
        </div>
        <div className="chat">

          <div className="chatInput">
            <UserInfo name={"mahmoud"} />
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
