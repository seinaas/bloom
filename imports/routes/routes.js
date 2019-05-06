import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

function isNotLoggedIn(context, redirect) {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        redirect('/login');
    }
}

function isLoggedIn(context, redirect) {
    if (Meteor.user() || Meteor.loggingIn()) {
        redirect('/');
    }
}

FlowRouter.triggers.enter([isNotLoggedIn], {
    except: ['login', 'signup']
});

/*
FlowRouter.triggers.enter([isLoggedIn], {
    only: ['login', 'signup']
});
*/

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