import { Meteor } from 'meteor/meteor';
import './publications.js';
import './accounts/emails.js';
import '../imports/startup/accounts-config.js';
import './userAccount.js';

//METHODS
import './methods/send-verification.js';
import './methods/update-server.js';

Meteor.startup(() => {
  // code to run on server at startup
});
