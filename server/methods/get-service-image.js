if (Meteor.isServer) {   
    Meteor.methods({
        //Gets image for user with given id
        getServiceImage(id) {
            //finds user with id
            user = Meteor.users.findOne({_id:id});
            //returns users picture (see server > accounts > userAccounts.js)
            return user.display_picture;
        }
    });
}