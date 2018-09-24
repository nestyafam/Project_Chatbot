const FBMessenger = require('../ui/messenger')
const messenger = new FBMessenger()

// Sets up greeting screen for the bot
BotProfile = {
	enableGetStarted() {
		// Set call to action button when user is about to address bot
		// for the first time. Handle the payload in postbacks.
		messenger.setMessengerProfile({ 
		  "get_started": {
		    "payload":"Start"
		  }
		})
	},

	setGreeting() {
		// NOTE: You can user {{user_last_name}} or {{user_full_name}} to
		// personalize greeting.
		messenger.setMessengerProfile({
		  greeting: [
		    {
		      locale: 'default',
		      text: "Hi {{user_first_name}}! I am your UNIBEN Chatbot. Click \"GET STARTED\" to begin. 😅" 
		    },
		    {
		      locale: 'fr_FR',
		      text: 'Bienvenue, {{user_first_name}}!'
		    }
		  ]
		})
	},

	enablePersistentMenu() {
  	// Design your persistent menu here:
  	messenger.setMessengerProfile({
      persistent_menu: [
        {
          locale: 'default',
          composer_input_disabled: false,
          call_to_actions: [
            {
							"title":"Quick Links",
							"type":"nested",
							"call_to_actions":[
								{
									"type":"web_url",
									"title":"About",
									"url":"https://uniben.edu/about-us.html",
									"webview_height_ratio":"full"
								},
								{
									"type":"web_url",
									"title":"News",
									"url":"http://info.uniben.edu/",
									"webview_height_ratio":"full"
								},
								{
									"type":"web_url",
									"title":"ICTU/CRPU",
									"url":"http://uniben.edu/ictu/",
									"webview_height_ratio":"full"
								}
							]
						},
            {
							"type":"web_url",
							"title":"Log In Website ",
							"url":"https://uniben.waeup.org/login",
							"webview_height_ratio":"full"
						},
            {
              type: 'postback',
              title: 'Contact Us',
              payload: 'Contact'
            }
          ]
        }
      ]
    })
  }
}

module.exports = BotProfile
