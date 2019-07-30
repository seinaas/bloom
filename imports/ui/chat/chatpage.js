
import { Template } from 'meteor/templating';
import { Messages } from '../../api/messages.js';
import { Channels } from '../../api/channels.js';
import { Servers } from '../../api/servers.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './chatpage.html';
import './message.js';
import './channel.js';
import './server.js';
import './settings.js';

autoScrollingIsActive = false;

if (Meteor.isClient) {
    Template.chatpage.helpers({
        //helpers = {{helper-name}} --> html
        messages() {
            //return messages collection
            return Messages.find();
        },
        channels() {
            //return channels collection
            return Channels.find();
        },
        servers() {
            //return servers collection
            return Servers.find();
        },
        isOwner() {
            return this.owner === Meteor.userId();
        },
        currentServer() {
            //finds server with _id stored in session and returns its name
            if (Servers.find({}).fetch().length > 0) {
                let server = Servers.findOne({ _id: Session.get("server") });
                let name = server.name;
                return name;
            }
            return "Default"

        },
        currentChannel() {
            //finds channel with _id stored in session and return channel name
            if (Channels.find({}).fetch().length > 0) {
                let channel = Channels.findOne({ _id: Session.get("channel") });
                if (typeof channel !== "undefined") {
                    Session.setPersistent('channelName', channel.name);
                }
            }

            return Session.get('channelName');
        },
        inChannel() {
            //TO MODIFY
            if (!Channels.find({}).fetch()) {
                return false;
            }
            return true;
        },
    });

    Template.chatpage.events({
        //POPUP CLOSE
        'click .popup-close'(e) {
            console.log($(e.target).parent());
            let popup = $(e.target).parent();
            /*var popup = $(e.target).parent();
            let popupText = document.getElementById('new-server-name');
            popupText.value = "";
            */
           popup.removeClass('show');
           console.log(e.target.classList);
        },

        /*TESTTESTTESTTEST*/
        'submit .add-user'(e) {
            //Prevent default browser form submit
            e.preventDefault();
            //Get value from form element

            const username = document.getElementById('add-user-name').value;

            if (username != "") {
                let server = Session.get('server');
                Meteor.call('inviteUser', username, server);
            }
        },
        
        'submit .new-message'(e) {
            //Prevent default browser form submit
            e.preventDefault();
            //Get value from form element
            const target = e.target;
            const text = target.text.value;

            if (text != "") {
                //Insert message into collection
                Messages.insert({
                    text,
                    createdAt: new Date().toLocaleTimeString(), //current time
                    owner: Meteor.userId(),
                    username: Meteor.user().username,
                    channel: Session.get('channel'),
                    type: 'text',
                });

                //scroll to last message
                scrollToBottom(250);
            }

            //Clear form
            target.text.value = '';
        },
        "scroll .chat-body": function () {
            var howClose = 80;  // # pixels leeway to be considered "at Bottom"
            var chatBody = $(".chat-body");
            var scrollHeight = chatBody.prop("scrollHeight");
            var scrollBottom = chatBody.prop("scrollTop") + chatBody.height();
            var atBottom = scrollBottom > (scrollHeight - howClose);
            autoScrollingIsActive = atBottom ? true : false;
        },
        //SERVER
        'click .btn-new-server': function (e) {
            //show new server overlay
            let element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.add('visible');
        },
        'click .mdi.mdi-close.close-new-server-card': function (e) {
            //close new server overlay
            element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.remove('visible');
            e.stopImmediatePropagation();
        },
        'submit .new-server': function (e) {
            //create new server
            e.preventDefault();

            const text = document.getElementsByClassName('servername')[0].value;
            let userList = [Meteor.user()];

            if (text != "") {
                //add server to collection
                Servers.insert({
                    name: text,
                    userList: userList,
                });

                //get server
                let server = Servers.findOne({ name: text });

                //update server collection for current user to display new server
                Meteor.call('updateServer', Meteor.userId(), server._id, (error,result) => {});

                //join created server
                Session.setPersistent('server', server._id);

                //insert general channel in new server
                Channels.insert({
                    name: 'general',
                    server: server._id,
                })


            }

            
            //close overlay
            let element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.remove('visible');
        },
        'click .edit-server-popup-open': function (e) {
            closePopups();

            //open edit server popup
            var popup = document.getElementById('edit-server-popup');
            popup.classList.add("show");
        },
        'click .notification-menu-popup-open': function (e) {
            closePopups();

            //open notification menu popup
            var popup = document.getElementById('notification-menu-popup');
            popup.classList.add("show");
        },
        //CHANNEL
        'click .new-channel-popup-open': function (e) {
            closePopups();

            //open new channel popup
            let popup = document.getElementById('edit-channel-popup');
            popup.classList.add("show");
        },
        'submit .new-channel': function (e) {
            e.preventDefault();

            const text = document.getElementsByClassName('new-channel-name')[0].value;

            //create new channel with text taken from input
            if (text !== "") {
                Channels.insert({
                    name: text,
                    server: Session.get('server'),
                });
            }
        },
        'mouseleave .channel-heading': function(e) {
            //close channel heading popups
            let openPopups = document.querySelectorAll('.channel-heading, .show');
            for (i=0;i<openPopups.length;i++) {
                openPopups[i].classList.remove('show');
            }
        },
        //MENU
        'click .btn-menu': function (e) {
            //extend menu and animate menu button once clicked
            var menubar = document.getElementsByClassName('menubar')[0];
            menubar.classList.toggle("menu-extended");
            var navicon = document.getElementById('nav-icon');
            navicon.classList.toggle('open');
        },
        //LOGOUT
        'click .btn-logout': function (e) {
            //logout user and redirect to login page
            e.preventDefault();
            FlowRouter.go('login');
            AccountsTemplates.logout();
        }
    });

    Template.message.onRendered(function () {
        //if autoScrolling is active, scroll to bottom once message created
        if (autoScrollingIsActive) {
            scrollToBottom(250);
        }
    });

    scrollToBottom = function scrollToBottom(duration) {
        //scroll to bottom of chat page
        var messageWindow = $(".chat-body");
        var scrollHeight = messageWindow.prop("scrollHeight");
        messageWindow.stop().animate({ scrollTop: scrollHeight }, duration || 0);
    };

    function closePopups() {
        //close all open popups
        let openPopups = document.getElementsByClassName('show');
        for (i=0;i<openPopups.length;i++) {
            openPopups[i].classList.remove('show');
        }
    }
}