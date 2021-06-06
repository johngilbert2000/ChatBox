import { check } from "meteor/check";
import { ChatCollection } from "./ChatCollection";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

const isAuth = (val) => {
    if (!val) {
        throw new Meteor.Error("Not Authorized.");
    }
}

const isValidUser = (id, user) => {
    if (!user) {
        throw new Meteor.Error("User Data Not Found");
    }
    if (id != user._id) {
        throw new Meteor.Error("Invalid User ID");
    }
}

Meteor.methods({
    "chat.insert"(text, user) {
        check(text, String);
        isAuth(this.userId);
        isValidUser(this.userId, user);
        
        ChatCollection.insert({
            text,
            userId: user._id,
            username: user.username,
            createdAt: new Date(),
        })
    },

    "chat.remove"(taskId) {
        check(taskId, String);
        isAuth(this.userId)

        const task = ChatCollection.findOne({ _id: taskId, userId: this.userId })
        isAuth(task)

        ChatCollection.remove(taskId);
    },

    "chat.select"(taskId, isSelected) {
        check(taskId, String);
        check(isSelected, Boolean);
        isAuth(this.userId);

        const task = ChatCollection.findOne({ _id: taskId, userId: this.userId })

        ChatCollection.update(taskId, {
            $set: {
                isSelected
            }
        });
    },

    "chat.register"(username, password) {
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
                username: username,
                password: password,
            });
        } else {
            throw new Meteor.Error("User Already Exists");
        }
    },
});