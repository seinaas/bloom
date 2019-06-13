import { Template } from 'meteor/templating';

import './verify.html';

if (Meteor.isClient) {
    Template.verify.events({
        'click .btn-send-verification': function (e) {
            Meteor.call('sendVerificationLink');
        },
    });
}