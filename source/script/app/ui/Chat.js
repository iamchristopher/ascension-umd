'use strict';

define(['component/Event'], function (Event) {
    var Chat = {
        send_btn: send,
        room: null,
        id: null,
        sender: null,

        _send: function (message, sender) {
            Event.emit('chat.message.send', {
                message: message,
                sender: sender,
                room: this.room
            }, true);

            this._log(message, sender);
        },

        _log: function (message, sender) {
            if (!sender) {
                sender = 'System';
            }

            log.innerHTML += '\r\n' + sender + ': ' + message;
            log.scrollTop = log.scrollHeight;
        },

        initialise: function () {
            var self = this;

            this.sender = getQueryString('user');
            this.room = getQueryString('room');
            this.id = getQueryString('id');

            Event.emit('chat.channel.join', {
                id: this.id,
                room: this.room,
                sender: this.sender
            }, true);
            this._log('You\'ve joined the channel.');

            this.send_btn.addEventListener('click', function () {
                self._send(message.value, self.sender);
            });

            Event.on('chat.message.receive', function (payload) {
                self._log(payload.message, payload.sender);
            });

            Event.on('network.connection.disconnect', function (payload) {
                self._log(payload.message);
            });

            Event.on('network.connection.reconnect', function (payload) {
                self._log(payload.message);
            });

            Event.on('network.connection.connect', function (payload) {
                self._log(payload.message);
            });
        }
    };

    return Chat;

    function getQueryString (field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        var string = reg.exec(href);
        return string ? string[1] : null;
    }
});
