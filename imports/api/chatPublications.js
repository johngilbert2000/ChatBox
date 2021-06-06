import { Meteor } from 'meteor/meteor';
import { ChatCollection } from '/imports/api/ChatCollection';

Meteor.publish('chat', function publishTasks() {
    return ChatCollection.find({});
});