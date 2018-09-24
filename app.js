'use strict'
require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');

const BotSettings = require('./Settings/bot_profile')
const MessageDispatch = require('./Dispatch/message')
const PostbackDispatch = require('./Dispatch/postback').PostbackDispatch

// Enable "Get Started" button, greeting and persistent menu for your bot
// Can uncomment this code to set it

//BotSettings.enableGetStarted()
// BotSettings.setGreeting()
 //BotSettings.enablePersistentMenu()

// Webserver parameter
const PORT = process.env.PORT

// Starting our webserver and putting it all together
const app = express();
app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'write here twice') {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/webhook', (req, res) => {
  let data = req.body;

  if (data.object == 'page') {    
    data.entry.forEach((pageEntry) => {
      // Iterate over each messaging event
      if (pageEntry.messaging) { 
        pageEntry.messaging.forEach((messagingEvent) => {
          if (messagingEvent.message) MessageDispatch(messagingEvent);
          else if (messagingEvent.postback) PostbackDispatch(messagingEvent);
          else console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        });
      }
      else console.log("Webhook received unknown Event: ", pageEntry)
    });

    res.sendStatus(200);
  }
});

app.listen(PORT);
console.log('Listening on :' + PORT + '...');
