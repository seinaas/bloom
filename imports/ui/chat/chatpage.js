
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
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
            //return collection messages
            return Messages.find();
        },
        channels() {
            //return collection channels
            return Channels.find();
        },
        servers() {
            return Servers.find();
        },
        isOwner() {
            return this.owner === Meteor.userId();
        },
        currentServer() {
            if (Servers.find({}).fetch().length > 0) {
                let server = Servers.findOne({ _id: Session.get("server") });
                let name = server.name;
                return name;
            }
            return "Default"

        },
        currentChannel() {
            if (Channels.find({}).fetch().length > 0) {
                let channel = Channels.findOne({ _id: Session.get("channel") });
                if (typeof channel !== "undefined") {
                    Session.setPersistent('channelName', channel.name);
                }
            }

            return Session.get('channelName');
        },
        inChannel() {
            if (!Channels.find({}).fetch()) {
                return false;
            }
            return true;
        },
    });

    Template.chatpage.events({
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
            let element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.add('visible');
        },
        'click .mdi.mdi-close.close-new-server-card': function (e) {
            element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.remove('visible');
            e.stopImmediatePropagation();
        },
        'submit .new-server': function (e) {
            e.preventDefault();

            const text = document.getElementsByClassName('servername')[0].value;
            let userList = [Meteor.user()];

            if (text != "") {
                Servers.insert({
                    name: text,
                    userList: userList,
                });

                let server = Servers.findOne({ name: text });

                Meteor.call('updateServer', server._id, (error,result) => {});
                console.log(Meteor.user().servers);

                Session.setPersistent('server', server._id);

                Channels.insert({
                    name: 'general',
                    server: server._id,
                })

            }

            

            let element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.remove('visible');
        },
        'click .btn-edit-server': function (e) {
            var popup = document.getElementById('edit-server-popup');
            popup.classList.add("show");
        },
        'mouseleave .btn-edit-server': function (e) {
            var popup = document.getElementById('edit-server-popup');
            let popupText = document.getElementById('new-server-name');
            popupText.value = "";
            popup.classList.remove('show');
        },
        //CHANNEL
        'click .btn-new-channel': function (e) {
            let popup = document.getElementById('edit-channel-popup');
            popup.classList.add("show");
        },
        'mouseleave .btn-new-channel': function (e) {
            let popup = document.getElementById('edit-channel-popup');
            let popupText = document.getElementById('new-channel-name');
            popupText.value = "";
            popup.classList.remove('show');
        },
        'submit .new-channel': function (e) {
            e.preventDefault();

            const text = document.getElementsByClassName('new-channel-name')[0].value;

            if (text !== "") {
                Channels.insert({
                    name: text,
                    server: Session.get('server'),
                });
            }
        },
        //MENU
        'click .btn-menu': function (e) {
            var menubar = document.getElementsByClassName('menubar')[0];
            menubar.classList.toggle("menu-extended");
            var navicon = document.getElementById('nav-icon');
            navicon.classList.toggle('open');
        },
        //LOGOUT
        'click .btn-logout': function (e) {
            e.preventDefault();
            FlowRouter.go('login');
            AccountsTemplates.logout();
        }
    });

    Template.message.onRendered(function () {
        if (autoScrollingIsActive) {
            scrollToBottom(250);
        }
    });

    scrollToBottom = function scrollToBottom(duration) {
        var messageWindow = $(".chat-body");
        var scrollHeight = messageWindow.prop("scrollHeight");
        messageWindow.stop().animate({ scrollTop: scrollHeight }, duration || 0);
    };
}