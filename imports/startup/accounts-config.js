import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

if (Meteor.isServer) {
  //MAIL URL from mailgun to send emails (sandbox for now)
  process.env.MAIL_URL = "";

  //Login with google config (clientId and secret from dev page)
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        loginStyle: "popup",
        clientId: "", // See table below for correct property name!
        secret: ""
      }
    }
  );
  
  //Login with facebook config (appId and secret from dev page)
  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        loginStyle: "popup",
        appId: "", // See table below for correct property name!
        secret: ""
      }
    }
  );
}

//Login configuration (things to show on login page)
AccountsTemplates.configure({
  defaultLayout: 'mainLayout',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,
  texts: {
    socialIcons: {
      google: "mdi mdi-google",
      facebook: 'mdi mdi-facebook'
    }
  }
});

//Username field
AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  displayName: "Username",
  required: true
});

//On login if new account go to verify page, else go to chat page
//On logout go to login page
AccountsTemplates.configure({
  onSubmitHook: (error, state) => {
    if (!error && state === 'signIn') {
      // login successful, route to index
      FlowRouter.go('/chat');
    } else if (!error && state === "signUp") {
      FlowRouter.go('/verify');
    }
  },
  onLogoutHook: (error, state) => {
    FlowRouter.go('login');
  }
});
