const FBMessenger = require('../ui/messenger')

const messenger = new FBMessenger()
const session = require('../util/session')

module.exports = function(id, condition, data) {
    switch (condition) {
        case "Start":
            let elements = [
                {
                     "title": "EXAMINATION INFORMATION",
                    "subtitle": "University Of Benin ",
                    "image_url": "http://nationaltrailonline.com.ng/wp-content/uploads/2017/07/auditorium.jpg", 
                    "default_action": {
                    "type": "web_url",
                    "url": "http://uniben.edu",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                    }
                },
                {
                    "title": "SPECIAL DOCTOR OF PHARMACY (PharmD) CONVERSION 2018/2019",
                    "subtitle": "",
                    "image_url": "http://www.edufrica.com/wp-content/uploads/2015/11/Ade97.jpg", 
                    "default_action": {
                    "type": "web_url",
                    "url": "https://uniben.waeup.org/applicants/spft2018",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                    }
                },
                {
                    "title": "JUPEB Pre-Degree (Foundation) Studies 2018/2019",
                    "subtitle": "for those who want to apply for Jupeb",
                    "image_url": "https://www.nigeriaschool.com.ng/wp-content/uploads/2015/10/Joint-Universities-Preliminary-Examinations-Board-Jupeb.jpg", 
                    "default_action": {
                    "type": "web_url",
                    "url": "https://uniben.waeup.org/applicants/pre2018",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                    }
                },
                {
                    "title": "JUPEB Pre-Degree (Foundation) Studies 2018/2019",
                    "subtitle": "for those who want to apply for Jupeb",
                    "image_url": "https://www.nigeriaschool.com.ng/wp-content/uploads/2015/10/Joint-Universities-Preliminary-Examinations-Board-Jupeb.jpg", 
                    "default_action": {
                    "type": "web_url",
                    "url": "https://uniben.waeup.org/applicants/pre2018",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                    }
                },
               
                
            ]
            messenger.sendListMessage(id, elements)
             break;
   }   
}