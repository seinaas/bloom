import { Channels } from '../imports/api/channels';
import { Messages } from '../imports/api/messages';
import { Servers } from '../imports/api/servers';
import { ReactiveVar } from 'meteor/reactive-var'

Meteor.startup(function () {
    //Publish channels
    Meteor.publish("channels", function (server) {
        return Channels.find({ server: server });
    });

    Meteor.publish('messages', function (channel) {

        // return all fields for things having the selected category
        // you can then subscribe via something like a client-side Session variable
        // e.g., Meteor.subscribe("thingsByCategory", Session.get("category"));

        return Messages.find({ channel: channel });
    });

});


Meteor.publish("servers", function () {
    this.autorun(function () {
        let currentUser = Meteor.users.findOne({ _id: Meteor.userId() });
        return Servers.find({ _id: { $in: currentUser.servers } });
    });
});