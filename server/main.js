import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import "/imports/api/chatMethods";
import "/imports/api/chatPublications";

const SEED_USERNAME = 'john';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  // create initial user if none exist
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    })
  };

  const user = Accounts.findUserByUsername(SEED_USERNAME);
});