import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './logged-in.html';

if (Meteor.isClient) {
    Template.loggedin.events({
        'click .goToChat': function (event) {
            //Go to chat page when button clicked
            if (Meteor.user()) {
                FlowRouter.go('/chat');
            }
        },
    });
}
