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