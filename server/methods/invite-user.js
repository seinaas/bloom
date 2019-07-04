if (Meteor.isServer) {
    Meteor.methods({
        inviteUser(username, server) {
            user = Meteor.users.findOne({username:username});
            userId = user._id;

            if (typeof user !== 'undefined') {
                Meteor.call('updateServer', userId, server, (error,result) => {});
            }
        }
    });
}