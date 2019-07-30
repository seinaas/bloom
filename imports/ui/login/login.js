import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './login.html';
import '../loggedin/logged-in.js';
import '../myAtForm/myAtForm.js';
import '../myPwdForm/myPwdForm.js';

if (Meteor.isClient) {
    Template.login.events({
        'submit form': function(event) {
            //login with email if email entered, login with username if username entered
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
        },
        //if clicked on no account button, go to signup page
        'click #at-signUp': function(event) {
            FlowRouter.go('signup');
        } 
    });
}