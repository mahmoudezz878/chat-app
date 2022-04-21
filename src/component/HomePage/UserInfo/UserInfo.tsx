import React from "react";
import Avatar from "@mui/material/Avatar";
import logo from "../../images/avatar.png";

type name = {
    name: string;
  };

const UserInfo = ({ name }:name) => {
  return (
    <div className="user-info-chat">
      <div className="user-info-avatar">
        <div className="user-avatar">
          <Avatar alt="Cindy Baker" src={logo} sx={{ width: 70, height: 70 }} />
        </div>
        <div className="user-info">
          <span className="user-chat-name">
            <p>{name}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
