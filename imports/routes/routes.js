import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Tracker } from 'meteor/tracker';

//Return to login page if not logged in
function isNotLoggedIn(context, redirect) {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        redirect('/login');
    }
}

//Go to chat page if logged in
function isLoggedIn(context, redirect) {
    if (Meteor.user() || Meteor.loggingIn()) {
        redirect('/chat');
    }
}

//Go to verify page if email is not verified
function isNotVerified(context, redirect) {
    Tracker.autorun(() => {
        if (typeof Meteor.user() !== 'undefined') {
            if (!Meteor.user().emails[0].verified) {
                FlowRouter.go('/verify');
            }
        }
    });
}

//Go to chat page if email is verified
function isVerified(context, redirect) {
    Tracker.autorun(() => {
        if (typeof Meteor.user() !== 'undefined') {
            if (Meteor.user().emails[0].verified) {
                FlowRouter.go('/chat');
            }
        }
    });
}

//Run isNotLoggedIn function on every page except login and signup
FlowRouter.triggers.enter([isNotLoggedIn], {
    except: ['login', 'signup']
});

//Run isNotVerified function on chat page
FlowRouter.triggers.enter([isNotVerified], {
    only: ['chat']
});

//Run isVerified function on verify page
FlowRouter.triggers.enter([isVerified], {
    only: ['verify']
});

/*FlowRouter.triggers.enter([isLoggedIn], {
    only: ['login', 'signup']
});*/

//Chat page
FlowRouter.route('/chat', {
    name: 'chat',
    action() {
        this.render('chatpage');
    }
});

//Login page
FlowRouter.route('/login', {
    name: 'login',
    action() {
        this.render('login');
    }
});

//Signup page
FlowRouter.route('/signup', {
    name: 'signup',
    action() {
        this.render('signup');
    }
});

//Verify page
FlowRouter.route('/verify', {
    name: 'verify',
    action() {
        this.render('verify');
    }
})

//Verify page after verification
FlowRouter.route('/verify-email/:token', {
    name: 'verify-email',
    action(params) {
        Accounts.verifyEmail(params.token, (error) => {
            FlowRouter.go('/chat');
        })
    }
})

//404 page (empty template)
FlowRouter.route('*', {
    action() {
        // Show 404 error page
        this.render('message');
    }
});