import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './login.html';

if (Meteor.isClient) {
    Template.login.events({
        'submit form': function(event) {
            event.preventDefault();
            let emailVar = event.target.email.value;
            let passwordVar = event.target.password.value;
            let usernameVar = event.target.username.value;
            
            if (emailVar != "") {
                Meteor.loginWithPassword(emailVar,passwordVar);
            }
            
            if (usernameVar != "") {
                Meteor.loginWithPassword(usernameVar,passwordVar);
            }
            
            if (Meteor.user()) {
                FlowRouter.go('/');
            }
        },

        'click .goToChat': function(event) {
            if (Meteor.user()) {
                FlowRouter.go('/');
            }
        }
    });
}


if (Meteor.isServer) {
    Meteor.startup(function() {

    });
}