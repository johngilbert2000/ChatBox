import React, { useState } from "react";

// Component for individual message in MsgList
const Msg = ({ user, msg, select, remove }) => {
  const [nameHover, setNameHover] = useState(false);

  const styles = {
    selected: {
      color: "#e47113",
      backgroundColor: "#efefef05",
    },

    nametag: {
      paddingRight: "10px",
      textTransform: "capitalize",
      fontWeight: "bold",
      color: "rgb(180,180,180)",
    },

    yourTag: {
      color: "#eee",
    },
  };

  return (
    <li className="msg" onClick={() => select(msg)}>
      <span
        style={
          user && user._id == msg.userId
            ? { ...styles.nametag, ...styles.yourTag }
            : styles.nametag
        }
        onMouseEnter={() => setNameHover(true)}
        onMouseLeave={() => setNameHover(false)}
      >
        {nameHover ? msg.username + " < " : msg.username.split(" ")[0] + " > "}
      </span>
      <span
        style={
          !!msg.isSelected && user._id == msg.userId ? styles.selected : {}
        }
      >
        {msg.text}
      </span>
      {!!msg.isSelected && user._id == msg.userId && (
        <span className="X" onClick={() => remove(msg)}>
          &times;
        </span>
      )}
    </li>
  );
};

export default Msg;
