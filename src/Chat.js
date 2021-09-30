import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  AttachFile,
  InsertEmoticon,
  MicNone,
  SearchOutlined,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === roomId) {
          setRoomName(doc.data().name);
        }
      });
    });
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed...", input);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/pixel-art/:${seed}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name">John Yasis</span>
          Hey Guys
          <span className="chat__timestamp">3:69pm</span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message...
          </button>
        </form>
        <MicNone />
      </div>
    </div>
  );
}

export default Chat;
