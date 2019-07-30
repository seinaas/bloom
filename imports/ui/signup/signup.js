import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './signup.html';
import '../loggedin/logged-in.js'
import '../myAtForm/myAtForm.js';

if (Meteor.isClient) {
    Template.signup.events({
        //if clicked on already have an account button, go to login page
        'click #at-signIn': function(event) {
            FlowRouter.go('login');
        } 
    });
}