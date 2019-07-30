import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './server.html';

if (Meteor.isClient) {
    Template.server.events({
        //select server once clicked
        'click .server': function (e) {
            console.log(this);
            Session.setPersistent('server', this._id);
        }            
    });

    Template.server.helpers({
        active() {
            //add class to selected server
            if (Session.get('server') === this._id) {
                return 'selected-server';
            } else {
                return '';
            }
        }
    });
}
