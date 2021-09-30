import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [avatar, setAvatar] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  const createChat = () => {
    const roomName = prompt("Please enter name for chat room...");
    const seed = Math.floor(Math.random() * 5000);
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        avatar: `https://avatars.dicebear.com/api/pixel-art/:${seed}.svg`,
      });
      //   setAvatar(db.collection("rooms").get().data())

      const filteredAvatar = db
        .collection("rooms")
        .get()
        .then((collection) => collection.docs.map((doc) => id));
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={""} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3>Add New Chat</h3>
    </div>
  );
}

export default SidebarChat;
