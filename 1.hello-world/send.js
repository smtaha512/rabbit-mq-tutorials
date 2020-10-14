#!/usr/bin/env/ node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(connectionError, connection) {
  if(connectionError) {
    throw connectionError;
  }
  connection.createChannel(function(channelCreationError, channel) {
    if(channelCreationError) {
      throw channelCreationError;
    }

    const q = 'hello';
    const message = 'Hello world!';

    channel.assertQueue(q, {
      durable: false
    });

    channel.sendToQueue(q, Buffer.from(message));
    console.log();
  })

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 5000);  
});

