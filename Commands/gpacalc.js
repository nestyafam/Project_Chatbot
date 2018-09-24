const FBMessenger = require('../ui/messenger')

const messenger = new FBMessenger()
const session = require('../util/session')

module.exports = function(id, condition, data) {
    switch (condition) {
        case "Start":
            messenger.sendTextMessage(id, "Enter all your courses, their credit load and grade. Example; " +
                "CSC415, 3, A, CSC422, 3, B, CSC417, 3, A...", () => {
                
                messenger.sendTextMessage(id, "The first item is the course name, the second is the credit load, and the last is your grade.", () => {
                    messenger.sendTextMessage(id, "Separate with comma.")
                })
            })
            session.setState(id, "Expecting courses")
            break;

        case "Courses":
            data = data.split(',')
            console.log(data)
            // [CSC415, 3, A, CSC422, 3, B, CSC417, 3, A, CSC423, 4, C]
            let mapper = {
                "A": 5, "B": 4, "C": 3, "D": 2, "E": 1, "F": 0
            }
            let course_score = 0
            let total_credits = 0
            for (let i = 1; i < data.length; i+=3) {
                console.log(i)
                let grade = data[i+1].trim().toUpperCase()
                let grade_value = mapper[grade]
                if (!grade_value) return messenger.sendTextMessage(id, "Your grade value can only be from A-F.")
                let credit_load = Number(data[i].trim())
                if (!credit_load) return messenger.sendTextMessage(id, "The Credit load can only be a number.")
                
                course_score += credit_load * grade_value
                total_credits += credit_load
            }
            messenger.sendTextMessage(id, "Your GPA is " + (course_score / total_credits).toFixed(2))
            break;

        case "No of Courses":
            if (data) {
                let number = Number(data)
                if (number <= 15) {
                    messenger.sendTextMessage(id, "Please list all courses, spearating them with a comma, e.g (CSC415, CSC422...)")
                    session.update(id, {"courses_no": number })
                    session.setState(id, "Expecting List of Courses")
                }
                else messenger.sendTextMessage(id, "please enter the correct number")
            }
            else messenger.sendTextMessage(id, "Please enter a number in your response.")
            break;

        case "List of Courses":
            session.get(id, (obj) => {
                let split = data.split(',')
                let split_length = split.length 
                let courses_no = Number(obj.courses_no)
            
                if (courses_no === split_length) {
                    messenger.sendTextMessage(id,"input grade and course credit (e.g A,3 or B,2 e.t.c)")
                }
                else messenger.sendTextMessage(id, "error! does not correspond") 
            })
            break;

        default:
            console.log("Invalid state", state)
    }
  
}

