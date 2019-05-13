import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

AccountsTemplates.configure({
  defaultLayout: 'mainLayout',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,
 
  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true
});

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  displayName: "Username",
  required: true
});

AccountsTemplates.configure({
  texts: {
    title: {
      signIn: "Connexion",
      signUp: "Créer un compte",
    },
    button: {
      signIn: "Connexion",
      signUp: "Créer",
    }
  }
});

AccountsTemplates.configure({
  onSubmitHook: ( error, state ) => {
      if ( !error && state === 'signIn' || state === "signUp") {
          // login successful, route to index
          FlowRouter.go('/');
      }
  },
  onLogoutHook: ( error, state ) => {
      FlowRouter.go('login');
  }
});