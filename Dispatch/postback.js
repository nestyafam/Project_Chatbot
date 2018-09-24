const commands = require('../Commands/commands') 

const FBMessenger = require('../ui/messenger')
const messenger = new FBMessenger()

// Routing for postbacks
function PostbackDispatch(event) {
	let senderID = event.sender.id
	let payload = event.postback.payload
	
	PostbackFilter(senderID, payload)
}

function PostbackFilter(id, payload) {
	if (payload === "Start") {
		messenger.getProfile(id, (err, res) => {
			if (err) console.log(err)
			console.log(res)

			let text = "Hi " + (res.first_name || '') + " welcome to the university of Benin Chatbot, please select your category."
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
				},
			]
			messenger.sendQuickRepliesMessage(id, text, elements)
		})
	}

	else if (payload === "Contact") {
		messenger.sendTextMessage(id, "You can contact us at nestyafam@gmail.com or call 08168048936.")
	}

	else if (payload === "Student") {
		let text= "i really love meeting students, tell me how i can be of help"
		let elements = [
			{
				"content_type":"text",
				"title":"log In",
				"payload":"Log in",
			},
			{
				"content_type":"text",
				"title":"News",
				"payload":"News",
			},
			{
				"content_type":"text",
				"title":"Calculate GPA",
				"payload":"GPA",
			},
			{
				"content_type":"text",
				"title":"more info",
				"payload":"more info",
			},
		]
		messenger.sendQuickRepliesMessage(id, text, elements)
	}

	else if (payload === "Staff") {
		let text= "cool 👍, tell me how i can be of help"
		let elements = [
			{
				"content_type":"text",
				"title":"Regular Update",
				"payload":"Regular Update",
			},
			{
				"content_type":"text",
				"title":"News",
				"payload":"News",
			},
		]
		messenger.sendQuickRepliesMessage(id, text, elements)
	}

	else if (payload === "Aspirant") {
		let text= "cool👍, tell me how i can be of help"
		let elements = [
			{
				"content_type":"text",
				"title":"Exams Info",
				"payload":"Exams Info",
			},
			{
				"content_type":"text",
				"title":"About SCHOOL",
				"payload":"About SCHOOL	",
			},
			{
				"content_type":"text",
				"title":"Regular Update",
				"payload":"Regular Update",
			},
			{
				"content_type":"text",
				"title":"Visit School Website",
				"payload":"Visit School Website",
			},
		]
		messenger.sendQuickRepliesMessage(id, text, elements)
	}
	else if (payload === "None"){
		messenger.getProfile(id, (err, res) => {
			if (err) console.log(err)
			console.log(res)

			messenger.sendTextMessage(id, "okay " + (res.first_name || '') + "thanks for stopping by ")
		})
	}

	else if (payload === "GPA") commands.gpacalc(id, "Start")
	else if (payload === "News") commands.news(id, "Start")
	else if (payload === "News Page 2") commands.news(id, "Page 2")
	else if (payload === "Log in") messenger. sendTextMessage(id, "you can log into your kofa by using the menu below")
	else if (payload === "more info")messenger.sendTextMessage(id, "click:https://uniben.edu/")
	else if (payload === "Exams Info")commands.exams_info(id, "Start")
	
}


module.exports = {
	PostbackDispatch,
	PostbackFilter
}