import React, { useState, useEffect } from "react";

import { Meteor } from "meteor/meteor";

// Third-party imports
import { motion } from "framer-motion";

const Title = ({ user, useSignUp, setUseSignUp, setLoggedIn }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // get window width
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const logout = () => {
    Meteor.logout();
    setLoggedIn(false);
  };

  // framer-motion movements
  const mov = {
    pop: {
      init: { opacity: 0, scale: 0.2 },
      final: { opacity: 1, scale: 1 },
      trans: { type: "spring", duration: 0.4, stiffness: 120, delay: 0.6 },
    },
    btn: {
      whileTap: { scale: 0.8 },
    },
  };

  return (
    <>
      <h1 className="title">ChatBox</h1>

      {user && (
        <motion.p
          initial={mov.pop.init}
          animate={mov.pop.final}
          transition={mov.pop.trans}
          className="welcome-msg"
        >
          Welcome {user.username}
        </motion.p>
      )}

      {!user && (
        <div className="logout-pos">
          {useSignUp ? (
            <motion.button
              whileTap={mov.btn.whileTap}
              className="menu-btn btn-alt"
              onClick={() => setUseSignUp(false)}
            >
              {windowWidth > 700 ? "Access Your Account" : "Sign In"}
            </motion.button>
          ) : (
            <motion.button
              whileTap={mov.btn.whileTap}
              className="menu-btn btn-alt"
              onClick={() => setUseSignUp(true)}
            >
              {windowWidth > 700 ? "Register a New Account" : "Register"}
            </motion.button>
          )}
        </div>
      )}

      {user && (
        <div className="logout-pos">
          <motion.button
            whileTap={mov.btn.whileTap}
            className="menu-btn"
            onClick={logout}
          >
            Logout
          </motion.button>
        </div>
      )}
    </>
  );
};

export default Title;
