const commands = require('../Commands/commands') 
const PostbackFilter = require('./postback').PostbackFilter

const FBMessenger = require('../ui/messenger')
const messenger = new FBMessenger()

const session = require('../util/session')

let saying_yes = ["yes", "yea", "yup", "ya", "yep", "sure", "you bet", "for sure", "sure thing", "certainly", "definitely", "yeah", 
  "yh", "absolutely", "totally", "totes", "yes please", "of course", "gladly", "indubitably", "indeed", "undoubtedly", "aye"]
let saying_no = ["no", "nope", "naa", "nah", "neh", "nay", "at all", "not at all", "negative", "Uhn Uhn", "no way", "nop"]

function defaultText(id, message) {
  console.log("default text")

  let text = "Please select an option:"
  let elements = [
    {
      "content_type":"text",
      "title":"Student",
      "payload":"Student",
    },
    {
      "content_type":"text",
      "title":"Staff",
      "payload":"Staff",
    },
    {
      "content_type":"text",
      "title":"Aspirant",
      "payload":"Aspirant",
    },
    {
      "content_type":"text",
      "title":"None",
      "payload":"None",
    }
  ]
  messenger.sendQuickRepliesMessage(id, text, elements)
}

function attachmentsHandler(id, attachments, state) {
  
} 

function messageTextHandler(id, message, state) {
  let entities = message.nlp.entities || {}
  let intent = entities.intent
  if (intent) {
    intent = intent[0].value
    console.log(intent)
  }

  let number = entities.number
  if (number) {
    number = number[0].value
    console.log(number)
  }

  if (intent === "greeting") {
      messenger.sendTextMessage(id, "Hey!")
  }
  else if (intent === "pidgin_greeting") {
    messenger.sendImageMessage(id, "http://gifimage.net/wp-content/uploads/2017/01/Smile-GIF-Image-for-Whatsapp-and-Facebook-10.gif")
    messenger.sendTextMessage(id, "HI!")
  }
  else if (intent === "pidgin_checkup") {
    messenger.sendTextMessage(id, "Hey! i am okay,thanks for asking.")
  
  }
  else if (intent === "capability_question") {
    messenger.sendTextMessage(id, "i can do alot,check this out", () => defaultText(id, message))
  }
  else if (state === "Expecting courses") commands.gpacalc(id, "Courses", message.text)
  else if (state === "Expecting List of Courses") commands.gpacalc(id, "List of Courses", message.text)
  else defaultText(id, message)
}

// Routing for messages
function MessageDispatch(event) {
	const senderID = event.sender.id
  const message = event.message

  console.log(message)

  // You may get a text, attachment, or quick replies but not all three
  let messageText = message.text;
  let messageAttachments = message.attachments;
  let quickReply = message.quick_reply;
  
  // Quick Replies contain a payload so we take it to the Postback
  if (quickReply) {
    PostbackFilter(senderID, quickReply.payload);
  }

  else if (messageAttachments) {
    session.getState(senderID, (state) => {
      attachmentsHandler(senderID, messageAttachments, state);
    })
  } 
  
  else if (messageText) {
    session.getState(senderID, (state) => {
      messageTextHandler(senderID, message, state);
    })
  }
}

module.exports = MessageDispatch