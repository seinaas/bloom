if (Meteor.isServer) {
    Meteor.methods({
        updateServer(user, server) {
            Meteor.users.update({_id: user}, { $push: { servers: server } });
        }
    });
}