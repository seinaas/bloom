import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

if (Meteor.isServer) {
  process.env.MAIL_URL = "smtps://postmaster%40sandbox61d34bbb2c39493db05b974d93b23c5d.mailgun.org:a4e4a5a836ded2065e44bdd0065d06ba-16ffd509-7a42c361@smtp.mailgun.org:465";

  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        loginStyle: "popup",
        clientId: "973496230486-4567jn0mvq939k67pofj5mpki2nfruob.apps.googleusercontent.com", // See table below for correct property name!
        secret: "nBAaB2nEVsE6NpuaHp-Briy9"
      }
    }
  );

  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        loginStyle: "popup",
        appId: "1324686194339020", // See table below for correct property name!
        secret: "23950a709833f1f58fed719c5c05bf7d"
      }
    }
  );
}

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

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  displayName: "Username",
  required: true
});

AccountsTemplates.configure({
  onSubmitHook: (error, state) => {
    if (!error && state === 'signIn') {
      // login successful, route to index
      FlowRouter.go('/');
    } else if (!error && state === "signUp") {
      FlowRouter.go('/verify');
    }
  },
  onLogoutHook: (error, state) => {
    FlowRouter.go('login');
  }
});