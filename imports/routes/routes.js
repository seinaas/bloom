import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Tracker } from 'meteor/tracker';

function isNotLoggedIn(context, redirect) {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        redirect('/login');
    }
}

function isLoggedIn(context, redirect) {
    if (Meteor.user() || Meteor.loggingIn()) {
        redirect('/chat');
    }
}

function isNotVerified(context, redirect) {
    Tracker.autorun(() => {
        if (typeof Meteor.user() !== 'undefined') {
            if (!Meteor.user().emails[0].verified) {
                FlowRouter.go('/verify');
            }
        }
    });
}

function isVerified(context, redirect) {
    Tracker.autorun(() => {
        if (typeof Meteor.user() !== 'undefined') {
            if (Meteor.user().emails[0].verified) {
                FlowRouter.go('/chat');
            }
        }
    });
}

FlowRouter.triggers.enter([isNotLoggedIn], {
    except: ['login', 'signup']
});

FlowRouter.triggers.enter([isNotVerified], {
    only: ['chat']
});

FlowRouter.triggers.enter([isVerified], {
    only: ['verify']
});

/*FlowRouter.triggers.enter([isLoggedIn], {
    only: ['login', 'signup']
});*/

FlowRouter.route('/chat', {
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

FlowRouter.route('/verify', {
    name: 'verify',
    action() {
        this.render('verify');
    }
})

FlowRouter.route('/verify-email/:token', {
    name: 'verify-email',
    action(params) {
        Accounts.verifyEmail(params.token, (error) => {
            FlowRouter.go('/chat');
        })
    }
})

FlowRouter.route('*', {
    action() {
        // Show 404 error page
        this.render('message');
    }
});