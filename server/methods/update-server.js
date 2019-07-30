if (Meteor.isServer) {
    Meteor.methods({
        updateServer(user, server) {
            //updates server list for user in parameters
            Meteor.users.update({_id: user}, { $push: { servers: server } });
        }
    });
}