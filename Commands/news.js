const FBMessenger = require('../ui/messenger')

const messenger = new FBMessenger()
const session = require('../util/session')

module.exports = function(id, condition, data) {
    switch (condition) {
        case "Start":
            let elements = [
                {
                  "title": "UNIVERSITY OF BENIN NEWS",
                  "subtitle": "ANNUAL RESEARCH DAY 2018 25th-26th October, 2018, FACULTY OF ENGINEERING COMPLEX, 9:00 AM PROMPT",
                  "image_url": "http://nationaltrailonline.com.ng/wp-content/uploads/2017/07/auditorium.jpg", 
                  "default_action": {
                    "type": "web_url",
                    "url": "http://ubard.uniben.edu/",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                  }
                },
                {
                    "title": "<VC hosts UNIBEN FOOTBALL TEAM>",
                    "subtitle": "the vc of the University Of Benin took time out to address the football team",
                    "image_url": "https://4.bp.blogspot.com/-3hUKoERI43g/W5tF3dvKBqI/AAAAAAAAGDM/stLIV66hxAsTZBk7aS9Z1gfWZerNWeJhQCLcBGAs/s1600/FB_IMG_15369022477285570.jpg", 
                    "default_action": {
                      "type": "web_url",
                      "url": "http://www.unibengist.com/2018/09/photos-uniben-vc-hosts-school-football.html",
                      "messenger_extensions": false,
                      "webview_height_ratio": "tall"
                    }
                },
                {
                    "title": "Uniben has Appointed as visitinf Professor to Zhejiang Nomral University, China",
                    "subtitle": "all the way",
                    "image_url": "https://4.bp.blogspot.com/-wAvgaeo2SQU/WJTPdXct0AI/AAAAAAAAE90/D0Vdxn1hs6MreocR7BcmJAt7MTqPsuTnQCPcBGAYYCw/s1600/unnamed.jpg", 
                    "default_action": {
                      "type": "web_url",
                      "url": "http://www.unibengist.com/",
                      "messenger_extensions": false,
                      "webview_height_ratio": "tall"
                    }
                },
                {
                    "title": "UNIBEN POST UTME 2018/2019 RESULTS OUT – SEE HOW TO CALCULATE YOUR AGGREGATE",
                    "subtitle": "",
                    "image_url": "http://euniben.com/wp-content/uploads/2018/08/utmenews-620x303.jpg", 
                    "default_action": {
                      "type": "web_url",
                      "url": "http://euniben.com/uniben-post-utme-2018-2019-results-out-see-how-to-calculate-your-aggregate/",
                      "messenger_extensions": false,
                      "webview_height_ratio": "tall"
                    }
                }
            ]
            let buttons = [
                {
                  "title": "View More",
                  "type": "postback",
                  "payload": "News Page 2"            
                }
            ]  
            messenger.sendListMessage(id, elements, buttons)
            break;

        case "Page 2":
            {
            let elements = [
                {
                "title": "<TITLE_TEXT>",
                "subtitle": "<SUBTITLE_TEXT>",
                "image_url": "<IMAGE_URL_FOR_THUMBNAIL>", 
                "default_action": {
                    "type": "web_url",
                    "url": "<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                }
                },
                {
                    "title": "<TITLE_TEXT>",
                    "subtitle": "<SUBTITLE_TEXT>",
                    "image_url": "<IMAGE_URL_FOR_THUMBNAIL>", 
                    "default_action": {
                    "type": "web_url",
                    "url": "<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                    }
                },
                {
                    "title": "<TITLE_TEXT>",
                    "subtitle": "<SUBTITLE_TEXT>",
                    "image_url": "<IMAGE_URL_FOR_THUMBNAIL>", 
                    "default_action": {
                    "type": "web_url",
                    "url": "<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                    }
                },
                {
                    "title": "<TITLE_TEXT>",
                    "subtitle": "<SUBTITLE_TEXT>",
                    "image_url": "<IMAGE_URL_FOR_THUMBNAIL>", 
                    "default_action": {
                    "type": "web_url",
                    "url": "<URL_TO_OPEN_WHEN_ITEM_IS_TAPPED>",
                    "messenger_extensions": false,
                    "webview_height_ratio": "tall"
                    }
                }
            ]
            messenger.sendListMessage(id, elements)
            }
            break;
    }
}