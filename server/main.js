import { Meteor } from 'meteor/meteor';
import './publications.js';
import './methods/send-verification.js';
import './accounts/emails.js';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  // code to run on server at startup
});
