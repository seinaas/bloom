import { Template } from 'meteor/templating';
//Subscribe to chatpage.js to access onCreated
import '../ui/chat/chatpage.js';

// Subscribe to messages collection and scroll to bottom of page
Template.chatpage.onCreated(function () {
    var self = this;
    //autorun runs on change, when channel changes run function
    this.autorun(function () {
        Meteor.subscribe('servers');
        //Subscribe to messages with current channel
        Meteor.subscribe("messages", Session.get('channel'), {
            onReady: function () {
                scrollToBottom();
                autoScrollingIsActive = true;
            },
        });

        // Subscribe to channels collection
        Meteor.subscribe('channels', Session.get('server'));
    });
});