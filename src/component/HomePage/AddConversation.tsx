import { Avatar, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import React, { useEffect, useState } from "react";
import * as api from "../../api";
import logo from "../images/avatar.png";

const AddConversation = ({ userId }: any) => {
  //dont know why userId lags in sending proper ID
  const [users, setUsers] = useState([]);

  async function fetchUsers(id: number) {
    const response = await api.getUsers(id);
    const users = response.data;
    console.log("users", users);
    setUsers(users);
  }

  async function newConversation(id: number, id2: number){
    const response = await api.newConversation(id, id2);
    handleClose();
  }

  useEffect(() => {
    const users = fetchUsers(userId);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{display: 'flex', alignItems:"center" }}>
      <IconButton  onClick={handleClick}>
        <AddIcon className="send-icon"/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <h4>Start A New Conversation</h4>
        {users.map((item: any) => {
          return (
            <Box key={item.id} className={`user-message-avatar`} sx={{p:2}} onClick={() =>{newConversation(userId, item.id)}}>
              <div className="user-avatar">
                <Avatar
                  alt="Cindy Baker"
                  src={logo}
                  sx={{ width: 70, height: 70 }}
                />
              </div>
              <div className="user-info">
                <span className="user-name">
                  <h4>{item.name}</h4>
                </span>
              </div>
            </Box>
          );
        })}
      </Popover>
    </Box>
  );
};

export default AddConversation;
