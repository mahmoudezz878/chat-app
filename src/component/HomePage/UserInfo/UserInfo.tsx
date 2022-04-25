import React from "react";
import Avatar from "@mui/material/Avatar";
import logo from "../../images/avatar.png";

const UserInfo = ({ currentChat }: any) => {

  console.log(currentChat);
  return (
    <div className="user-info-chat">
      {currentChat ? (
        <div className="user-info-avatar">
          <div className="user-avatar">
            <Avatar
              alt="Cindy Baker"
              src={logo}
              sx={{ width: 70, height: 70 }}
            />
          </div>
          <div className="user-info">
            <span className="user-chat-name">
              <p>{currentChat?.users[1].name}</p>
            </span>
          </div>
        </div>
      ) : (
        "Choose Your Conversation..."
      )}
    </div>
  );
};

export default UserInfo;
