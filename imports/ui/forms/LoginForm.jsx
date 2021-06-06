import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

// Form for logging in user
const LoginForm = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failLogin, setFailLogin] = useState(false);

  const login = (e) => {
    e.preventDefault();
    setFailLogin(false);

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        // login failed; sets state to display error message
        setUsername("");
        setPassword("");
        setFailLogin(true);
      } else {
        setFailLogin(false);
      }
    });
    setLoggedIn(true);
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
        <Fade delay={200}>
          <form onSubmit={login} className="login-form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {failLogin && <p style={{ color: "red" }}>Invalid Credentials</p>}

            <motion.button
              whileTap={mov.btn.whileTap}
              type="submit"
              className="menu-btn"
            >
              Log In
            </motion.button>
          </form>
        </Fade>
      </div>
    </div>
  );
};

export default LoginForm;
