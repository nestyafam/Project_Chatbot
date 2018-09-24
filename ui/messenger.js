const fetch = require('node-fetch');
const querystring = require("querystring");

module.exports = class Messenger {
  constructor (token, notificationType) {
    this.token = token || process.env.FB_PAGE_TOKEN
    this.notificationType = notificationType || 'REGULAR'
  }

  sendAction (id, action) {
    this.sendMessage(id, action)
  }

  /**
   * @param {string} id 
   * @param {string} text 
   * @param {string} notificationType 
   * @param {Function} cb 
   */
  sendTextMessage (id, text, notificationType, cb) {
    const messageData = {
      text: text
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  /**
   * @param {string} id 
   * @param {string} imageURL 
   * @param {string} notificationType 
   * @param {Function} cb 
   */
  sendImageMessage (id, imageURL, notificationType, cb) {
    const messageData = {
      'attachment': {
        'type': 'image',
        'payload': {
          'url': imageURL
        }
      }
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  /**
   * @param {string} id 
   * @param {Array} elements 
   * @param {string} notificationType 
   * @param {Function} cb 
   */
  sendHScrollMessage (id, elements, notificationType, cb) {
    const messageData = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': elements
        }
      }
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  /**
   * @param {string} id 
   * @param {string} text 
   * @param {Array} buttons 
   * @param {string} notificationType 
   * @param {Function} cb 
   */
  sendButtonsMessage (id, text, buttons, notificationType, cb) {
    const messageData = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'button',
          'text': text,
          'buttons': buttons
        }
      }
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  /**
   * @param {string} id 
   * @param {Array} elements 
   * @param {Array} buttons 
   * @param {string} topElementStyle - large or compat
   * @param {string} notificationType 
   * @param {Function} cb 
   */
  sendListMessage (id, elements, buttons, topElementStyle, notificationType, cb) {
    buttons = buttons || []
    topElementStyle = topElementStyle || 'large'
    const messageData = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'list',
          'top_element_style': topElementStyle,
          'elements': elements,
          'buttons': buttons
        }
      }
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  /**
   * @param {string} id 
   * @param {string} attachment 
   * @param {Array} quickReplies 
   * @param {string} notificationType 
   * @param {Function} cb 
   */
  sendQuickRepliesMessage (id, attachment, quickReplies, notificationType, cb) {
    const attachmentType = (typeof attachment === 'string' ? 'text' : 'attachment')
    const attachmentObject = typeof attachment === 'string' ? attachment : {
      type: 'template',
      'payload': {
        'template_type': 'generic',
        'elements': attachment
      }
    }
    const messageData = {
      [attachmentType]: attachmentObject,
      'quick_replies': quickReplies
    }
    this.sendMessage(id, messageData, notificationType, cb)
  }

  /**
   * @param {string} id 
   * @param {*} data 
   * @param {string} notificationType 
   * @param {Function} cb 
   */
  sendMessage (id, data, notificationType = this.notificationType, cb) {
    if (typeof notificationType === 'function') {
      cb = notificationType
      notificationType = this.notificationType
    }

    const json = {
      recipient: {
        id: id
      }
    }

    if (typeof data === 'string') {
      json.sender_action = data
    } else {
      json.message = data
      json.notification_type = notificationType
    }

    const url = 'https://graph.facebook.com/v3.0/me/messages';
    const qs = {access_token: this.token};
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json)
    }
    sendRequest(url, qs, req, cb)
  }

  /**
   * @param {string} id 
   * @param {Function} cb 
   */
  getProfile (id, cb) {
    const uri = `https://graph.facebook.com/v3.0/${id}`;
    const qs = {
      fields: 'first_name,last_name,gender',
      access_token: this.token
    }
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    sendRequest(uri, qs, req, cb)
  }

  /**
   * @param {*} jsonObject 
   * @param {Function} cb 
   */
  setMessengerProfile (jsonObject, cb) {
    const uri = `https://graph.facebook.com/v3.0/me/messenger_profile`;
    const qs = {
      access_token: this.token
    }
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObject)
    }
    sendRequest(uri, qs, req, (err, body) => console.log(body))
  }

  /**
   * @param {string} userPsid 
   * @param {string} targetAppId 
   * @param {Function} cb 
   */
  passThreadControl(userPsid, targetAppId, cb) {
    console.log('PASSING THREAD CONTROL')
    const payload = {
      recipient: {
        id: userPsid
      },
      target_app_id: targetAppId
    };
    const graph_url = `https://graph.facebook.com/me/pass_thread_control`;
    const qs = {access_token: this.token}
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    sendRequest(graph_url, qs, req, cb)
  }
}

const sendRequest = (uri, qs, options, cb) => {
  fetch(`${uri}/?${querystring.stringify(qs)}`, options)
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.error) console.log(json)
      if (cb) cb(null, json)  
    }) 
    .catch(err => console.log(err))
}
