if (Meteor.isServer) {
    Meteor.methods({
        inviteUser(username, server) {
            //adds new user to server (TO IMPLEMENT: ACCEPT/DECLINE INVITE)
            user = Meteor.users.findOne({username:username});
            userId = user._id;

            //runs updateServer to add specified user
            if (typeof user !== 'undefined') {
                Meteor.call('updateServer', userId, server, (error,result) => {});
            }
        }
    });
}