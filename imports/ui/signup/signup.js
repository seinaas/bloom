import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './signup.html';
import '../loggedin/logged-in.js'

if (Meteor.isClient) {
    Template.signup.events({
        'submit form': function(event) {
            event.preventDefault();
            if (Meteor.user()) {
                FlowRouter.go('/');
            }
        },
        'click #at-signIn': function(event) {
            FlowRouter.go('login');
        } 
    });
}