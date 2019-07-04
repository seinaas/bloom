import { Meteor } from 'meteor/meteor';
import './publications.js';
import './accounts/emails.js';
import './accounts/userAccount.js';
import '../imports/startup/accounts-config.js';


//METHODS
import './methods/send-verification.js';
import './methods/update-server.js';
import './methods/invite-user.js';
import './methods/get-service-image.js';

Meteor.startup(() => {
  // code to run on server at startup
});
