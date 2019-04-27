import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './channel.html';

if (Meteor.isClient) {
    Template.channel.events({
        'click .channel': function (e) {
            Session.setPersistent('channel', this._id);
        }
    });

    Template.channel.helpers({
        active() {
            if (Session.equals('channel', this._id)) {
                return 'selected-channel';
            } else {
                return '';
            }
        }
    });
}
