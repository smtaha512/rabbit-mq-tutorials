#!/usr/bin/env/ node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (connectionError, connection) {
    if(connectionError) {
      throw connectionError;
    }

    connection.createChannel(function (channelError, channel) {
      if(channelError) {
        throw channelError;
      }

      const q = 'hello';

      channel.assertQueue(q, {
        durable: false
      });

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

      channel.consume( q, function (message) {
        console.log(" [x] Received %s", message.content.toString());
      }, {
        noAck: false
      });
    });
});