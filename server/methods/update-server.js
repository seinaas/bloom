if (Meteor.isServer) {
    Meteor.methods({
        updateServer(server) {
            Meteor.users.update({_id: Meteor.userId()}, { $push: { servers: server } });
        }
    });
}