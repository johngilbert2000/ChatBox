import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

// Server Methods
import { ChatCollection } from "../api/ChatCollection";
import "/imports/api/chatMethods";

// UI Imports
import Title from "./Title";
import MsgMenu from "./messages/MsgMenu";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";

// Third-party imports (animations)
import { AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";
// Note that if you get the following warning,
// it's related to Emotion (used by react-awesome-reveal)
// and it supposedly only appears in dev builds
//
//  "Warning: React has detected a change in the order of Hooks"
//
// For more info:
// https://github.com/morellodev/react-awesome-reveal/issues/57

// Main App Component
export const App = () => {
  const [useSignUp, setUseSignUp] = useState(false);

  // User Meteor Tracker
  // Updates client when changes occur on server
  const user = useTracker(() => Meteor.user());

  // Messages Meteor Tracker
  // Updates client when changes occur on server
  const { messages, isLoading } = useTracker(() => {
    // Ensure user exists
    if (!Meteor.user()) {
      return { messages: [], isLoading: false };
    }

    const handler = Meteor.subscribe("chat");

    // Check if still loading
    if (!handler.ready()) {
      return { messages: [], isLoading: true };
    }

    // Load the last 15 messages
    const messages = ChatCollection.find(
      {},
      { sort: { createdAt: -1 }, limit: 15 }
    ).fetch();
    return { messages, isLoading: false };
  });

  return (
    <div>
      <AnimatePresence exitBeforeEnter="true">
        <Fade>
          <>
            <Title
              user={user}
              useSignUp={useSignUp}
              setUseSignUp={setUseSignUp}
            />

            {user ? (
              <MsgMenu user={user} msgs={messages} />
            ) : (
              <>
                {useSignUp ? (
                  <SignUpForm setUseSignUp={setUseSignUp} />
                ) : (
                  <LoginForm />
                )}
              </>
            )}
          </>
        </Fade>
      </AnimatePresence>
    </div>
  );
};
