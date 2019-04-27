import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
    name: 'chat',
    action() {
        this.render('chatpage');
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        this.render('login');
    }
});

FlowRouter.route('/signup', {
    name: 'signup',
    action() {
        this.render('signup');
    }
});

FlowRouter.route('*', {
  action() {
    // Show 404 error page
    this.render('message');
  }
});