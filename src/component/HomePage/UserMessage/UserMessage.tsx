import React from "react";
import Avatar from "@mui/material/Avatar";
import logo from "../../images/avatar.png";

const UserMessage = ({item, messages, user, name, dateCreated, message }:any) => {
  return (
    <div className="user-message">
      <div className="user-message-avatar">
        <div className="user-avatar">
        <Avatar
                  alt="Cindy Baker"
                  src={logo}
                  sx={{ width: 70, height: 70 }}
                />
        </div>
        <div className="user-info">
                  <span className="user-name">
                    <h4>{item.messages[0].user.name}</h4>
                    <span className="time">{item.messages[0].dateCreated}</span>
                  </span>
                  <span className="user-msg">{item.messages[0].message}</span>
                </div>
      </div>
    </div>
  );
};

export default UserMessage;
