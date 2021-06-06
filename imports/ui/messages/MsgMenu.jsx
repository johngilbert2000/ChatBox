import React from "react";
import MsgInput from "./MsgInput";
import MsgList from "./MsgList";

// Contains conversation messages,
// a scroll down button,
// and a place to input new messages
const MsgMenu = ({ user, msgs }) => {
  return (
    <>
      <MsgList user={user} msgs={msgs} />
      <MsgInput user={user} />
    </>
  );
};

export default MsgMenu;
