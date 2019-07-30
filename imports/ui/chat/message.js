import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './message.html';

import linkifyStr from 'linkifyjs/string';

Template.message.helpers({
    displayPicture() {
        //user profile picture
        var image = Template.instance().image.get();
        console.log(image);
        return image;
    },
    message() {
        //pass user input through linkify then display
        const str = this.text;
        const finalText = linkifyStr(str, {className: 'link'});
        return finalText;
    }
});



Template.message.onCreated(function () {
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


