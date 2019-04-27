import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './server.html';

if (Meteor.isClient) {
    Template.server.events({
        'click .server': function (e) {
            console.log(this);
            Session.setPersistent('server', this._id);
        }            
    });

    Template.server.helpers({
        active() {
            if (Session.get('server') === this._id) {
                return 'selected-server';
            } else {
                return '';
            }
        }
    });
}
