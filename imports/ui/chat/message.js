import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './message.html';



Template.message.helpers({
    displayPicture() {
        var image = Template.instance().image.get();
        console.log(image);
        return image;
    }
});


//Runs when message is created
Template.message.onCreated(function () {
    var self = this;
    //creates reactive var to load profile image
    self.image = new ReactiveVar('Waiting for response from server...');
    //See server > methods
    Meteor.call('getServiceImage', self.data.owner, function(error,imageUrl) {
        if (error) {
            console.log(error);
        } else {
            self.image.set(imageUrl);
        }
    })
});
