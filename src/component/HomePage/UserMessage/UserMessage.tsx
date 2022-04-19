import React from "react";
import Avatar from "@mui/material/Avatar";
import logo from "../../images/avatar.png";

type Message = {
  name: string;
  msg: string;
  time: string;
};

const UserMessage = ({ name, msg, time }: Message) => {
  return (
    <div className="user-message">
      <div className="user-message-avatar">
        <div className="user-avatar">
          <Avatar alt="Cindy Baker" src={logo} sx={{ width: 70, height: 70 }} />
        </div>
        <div className="user-info">
          <span className="user-name">
            <h4>{name}</h4>
            <span className="time">{time}</span>
          </span>
          <span className="user-msg">{msg}</span>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
