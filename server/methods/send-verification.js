if (Meteor.isServer) {
    Meteor.methods({
        sendVerificationLink() {
            let userId = Meteor.userId();
            if (userId) {
                //send verification link to user if not verified
                return Accounts.sendVerificationEmail(userId);
            }
        }
    });
}