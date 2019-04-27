
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

autoScrollingIsActive = false;

if (Meteor.isClient) {
    var channelName;
    if (!Meteor.user()) {
        FlowRouter.go('/signup/');
    }

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
                let server = Servers.findOne({_id: Session.get("server")});
                let name = server.name;
                return name;
            }
            return "Default"
        },
        currentChannel() {
            if (Channels.find({}).fetch().length > 0) {
                let channel = Channels.findOne({_id: Session.get("channel")});
                if (typeof channel !== "undefined") {
                    channelName = channel.name;
                }
            }
            return channelName;
        }
    });

    Template.chatpage.events({
        'submit .new-message'(event) {
            //Prevent default browser form submit
            event.preventDefault();
            //Get value from form element
            const target = event.target;
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
            element.classList.toggle('visible');
        },
        'click .mdi.mdi-close.close-new-server-card': function (e) {
            console.log('ok');
            element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.toggle('visible');
            e.stopImmediatePropagation();
        },
        'click .new-server-overlay': function (e) {
            element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.add('visible');
        },
        'submit .new-server': function (event) {
            event.preventDefault();

            const text = document.getElementsByClassName('servername')[0].value;

            
            if (text != "") {
                Servers.insert ({
                    name: text,
                });

                let server = Servers.findOne({name: text});

                Channels.insert({
                    name: 'general',
                    server: server._id,
                })
            }

            let element = document.getElementsByClassName("new-server-overlay")[0];
            element.classList.add('hidden');
            element.classList.remove('visible');
        },
        'click .btn-edit-server': function(e) {
            var popup = document.getElementById('edit-server-popup');
            popup.classList.add("show");
        },
        'mouseleave .btn-edit-server': function(e) {
            var popup = document.getElementById('edit-server-popup');
            popup.classList.remove('show');
        },
        //CHANNEL
        'click .btn-add-channel': function(e) {
            var popup = document.getElementById('edit-channel-popup');
            popup.classList.add("show");
        },
        'mouseleave .btn-add-channel': function(e) {
            var popup = document.getElementById('edit-channel-popup');
            popup.classList.remove('show');
        },
        //MENU
        'click .btn-menu': function(e) {
            var menubar = document.getElementsByClassName('menubar')[0];
            menubar.classList.toggle("menu-extended");
        },
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