if (Meteor.isServer) {
    Meteor.methods({
        inviteUser(username, server) {
            user = Meteor.users.findOne({username:username});
            userId = user._id;

            console.log(userId);

            if (typeof user !== 'undefined') {
                Meteor.call('updateServer', userId, server, (error,result) => {});
            }
        }
    });
}