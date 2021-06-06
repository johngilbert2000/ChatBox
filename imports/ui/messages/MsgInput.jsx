import React, { useState } from "react";
import { motion } from "framer-motion";
import { Meteor } from "meteor/meteor";

// Allows user to input new messages to conversation menu (MsgMenu)
const MsgInput = ({ user }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;
    if (!user) return;

    Meteor.call("chat.insert", text.trim(), user);

    setText("");
  };

  // framer-motion movements
  const mov = {
    btn: {
      whileTap: { scale: 0.8 },
    },
  };

  return (
    <div className="input-location">
      <form className="msg-form" onSubmit={handleSubmit}>
        <input
          className="input-text"
          type="text"
          placeholder="Type here to start a conversation"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <motion.button
          whileTap={mov.btn.whileTap}
          className="btn"
          type="submit"
        >
          Submit
        </motion.button>
      </form>
    </div>
  );
};

export default MsgInput;
