import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducer/app";
import { RootState } from "../../redux/store";
import * as api from "../../api";

import { io } from "socket.io-client";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import UserMessage from "./UserMessage/UserMessage";


const HomePage = () => {
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

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.app.token);
  async function fetchUser(token: string) {
    const response = await api.getUser(token);
    dispatch(setUser(response.data.user));
  }

  const localToken = token || localStorage.getItem("token") || "";
  useEffect(() => {
    fetchUser(localToken);
    const socket = io("http://localhost:3000", {
  withCredentials: true
  })}, []);

  const user = useSelector((state: RootState) => state.app.user);
  console.log(user);

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
          <div className="chatInput">chat</div>
          <div className="chatField">
            <form className="chat-form">
              <TextField className="chat-input" fullWidth id="fullWidth" />
              <span className="send-icon">
                <SendIcon />
              </span>
            </form>
          </div>
        </div>
      </div>
      <div>
      {/* <h1>HomePage</h1>
      <h4>{token || localStorage.getItem("token")}</h4>
      <h6>{user?.name}</h6> */}
      </div>
    </div>
  );
};

export default HomePage;
