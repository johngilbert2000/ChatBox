import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

// Form for registering a new user
const SignUpForm = ({ setUseSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  const [unmatchedPassword, setUnmatchedPassword] = useState(false);

  // creates new user
  const register = (e, username, password, repeatedPassword) => {
    e.preventDefault();
    setInvalidUser(false);

    if (password != repeatedPassword) {
      // passwords don't match; sets state to display error message
      setUnmatchedPassword(true);
      return;
    } else {
      setUnmatchedPassword(false);
    }

    Meteor.call("chat.register", username, password, (error) => {
      if (error) {
        setInvalidUser(true);
      } else {
        setInvalidUser(false);
        setUseSignUp(false);
      }
    });
  };

  // framer-motion movements
  const mov = {
    btn: {
      whileTap: { scale: 0.8 },
    },
  };

  return (
    <div className="menu-parent">
      <div className="menu login">
        <Fade delay={200} cascade="true">
          <>
            <form
              onSubmit={(e) =>
                register(e, username, password, repeatedPassword)
              }
              className="login-form"
            >
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="verify-password">Verify Password</label>
              <input
                type="password"
                name="verify-password"
                id="verify-password"
                placeholder="Verify Password"
                required
                onChange={(e) => setRepeatedPassword(e.target.value)}
              />

              {invalidUser && (
                <p style={{ color: "red" }}>Username Already Exists</p>
              )}

              {unmatchedPassword && (
                <p style={{ color: "red" }}>Passwords Do Not Match</p>
              )}

              <motion.button
                whileTap={mov.btn.whileTap}
                type="submit"
                className="menu-btn"
              >
                Sign Up
              </motion.button>
            </form>
          </>
        </Fade>
      </div>
    </div>
  );
};

export default SignUpForm;
