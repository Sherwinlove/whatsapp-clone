import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import db from "./firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import {
  AttachFile,
  InsertEmoticon,
  MessageSharp,
  MicNone,
  SearchOutlined,
} from "@material-ui/icons";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomSeeds, setRoomSeeds] = useState([]);
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id === roomId) {
          setRoomName(doc.data().name);
        }
      });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    });
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    db.collection("rooms").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        setRoomSeeds([]);
      });
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed...", input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

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
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
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
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
