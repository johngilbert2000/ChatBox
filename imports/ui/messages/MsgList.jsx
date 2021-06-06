import React, { useRef } from "react";
import { Meteor } from "meteor/meteor";
import { Fade } from "react-awesome-reveal";
import { AiOutlineArrowDown } from "react-icons/ai";

import Msg from "./Msg";

// Lists messages to be shown in conversation menu (MsgMenu)
// Also contains button for scrolling to bottom of conversation
const MsgList = ({ user, msgs, loggedIn }) => {
  const scrollRef = useRef(null);

  // scrolls to bottom of messages
  const scrollDown = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Selects message on click (for deletion)
  const select = ({ _id, userId, isSelected }) => {
    if (!user) return;
    if (user._id != userId) return;
    Meteor.call("chat.select", _id, !isSelected);
  };

  // Deletes selected message
  const remove = ({ _id }) => {
    if (!user) return;
    Meteor.call("chat.remove", _id);
  };

  return (
    <>
      <div className="menu-parent">
        <ul className="menu">
          <Fade>
            {msgs.reverse().map((msg) => (
              <Msg
                key={msg._id}
                user={user}
                msg={msg}
                select={select}
                remove={remove}
                loggedIn={loggedIn}
              />
            ))}
          </Fade>
          <div ref={scrollRef} />
        </ul>
      </div>
      {msgs.length > 6 && (
        <AiOutlineArrowDown size={30} onClick={scrollDown} className="arrow" />
      )}
    </>
  );
};

export default MsgList;
