const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: { // Enter the username and password for the dedicated Santabot Gmail account
        user: 'anyemailaddressyouwanttouse@somegmailaccount.com',
        pass: 'whateverthepasswordis',
    },
});
var names = ['Test1','Test2','Test3','Test4','Test5','Test6'];
var emails = ['fake@fake.com','fake@fake.com','fake@fake.com','fake@fake.com','fake@fake.com','fake@fake.com']; // E-mails order must match names order, e.g. if the first name is Mike, the first email must be Mike's email address and so on.
var numbers = []; // Empty array to be filled with tne number of names in the array
for (x=0; x < names.length; x++) { // Add each number into the numbers array
    numbers.push(x);
}
var numbersUpdated = []; // Empty array to be filled with the recipient numbers
function shuffle(o) { // This function shuffles positions of elements in an array
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
   return o;
};

function RandomNumber (numberLimit) { // This function outputs a random number from a range from 0 to numberLimit
    return Math.floor(Math.random()*numberLimit);
}

var check = shuffle(numbers); // Shuffle the numbers

function avoidThem (person1, person2) { 
var position1 = names.indexOf(person1);
var position2 = names.indexOf(person2);
    if (i==position1) { // When the loop gets to the first person mentioned
        if (newNumber == position2) { // If the person selected is the second person mentioned
            newNumberPositionClash = newNumberPosition + 1; // Move one to the right from the original position to choose someone else
            if (newNumberPositionClash >= numbers.length -1) { // If that position doesn't exist
                newNumberPositionClash = "rubbish"; // Reset the newNumberPositionClash variable
                newNumberPositionClash = newNumberPosition - 1; // Move one to the left from the original position to choose someone else
                newNumber = numbers[newNumberPositionClash]; // set newNumber to be someone other than the second person mentioned
            } else {
                newNumberPositionClash = "rubbish"; // Reset the newNumberPositionClash variable
                newNumber = numbers[newNumberPositionClash]; // set newNumber to be someone other than the second person mentioned
            }
        } else {
            
        } 
    } else if (i== position2) { // When the loop gets to the second person mentioned
        if (newNumber == position1) { // If the person selected is the first person mentioned
            newNumberPositionClash = newNumberPosition + 1; // Move one to the right from the original position to choose someone else
            if (newNumberPositionClash >= numbers.length - 1) { // If that position doesn't exist
                newNumberPositionClash = "rubbish"; // Reset the newNumberPositionClash variable
                newNumberPositionClash = newNumberPosition - 1; // Move one to the left from the original position to choose someone else
                newNumber = numbers[newNumberPositionClash]; // set newNumber to be someone other than the first person mentioned
            } else {
                newNumberPositionClash = "rubbish"; // Reset the newNumberPositionClash variable
                newNumber = numbers[newNumberPositionClash]; // set newNumber to be someone other than the first person mentioned
            }
        } else {
            
        }
    }

}
for (i = 0; i < names.length; i++) {
    // "i" is the number selected on the lhs ("i" is the sender)
    var sender = names[i]; // Set "sender" to be an element in the names array

    var currentIndex = numbers.indexOf(i); // Find where "i" is in the numbers array and return its position
    if (currentIndex >= 0) { // If you can find "i" in the numbers array, remove it
      numbers.splice(currentIndex, 1);
    } else {
    }
   
    var newNumberPosition = RandomNumber(numbers.length); // Generate a random number in the numbers array from the numbers left over
    var newNumber = numbers[newNumberPosition]; // Select an element at the newNumberPosition of the numbers array (the element will be a number)

    // If you want to avoid two people from being picked with one another (e.g. if they are a couple and don't want to be matched together), you can use the avoidThem function.

  //  avoidThem("Test1","Test5");

    numbersUpdated.push(newNumber); // Add newNumber to the numbersUpdated array to keep track of the numbers being selected on the rhs (and their corresponding matches)
    var recipient = names[newNumber]; // Choose the recipient from the names array, selecting at the newNumber position
    
    var newIndex = numbers.indexOf(newNumber); // Find where newNumber is in the numbers array and return its position
    var existingPicksPosition = numbersUpdated.indexOf(i); // Find where "i" is in the numbersUpdated array and return its position
    if (existingPicksPosition >= 0) { // If you can find "i" in the numbers array, then remove newIndex from the array
      numbers.splice(newIndex, 1);
    } else { // Otherwise, remove newIndex from the array and add "i" back into the numbers array
    numbers.splice(newIndex, 1, i);
    }
    
    var mailOptions = { // Send an email from the Santabot account to the sender's email, telling them that their match is the recipient randomly selected.
        from: 'anyemailaddressyouwanttouse@somegmailaccount.com',
        to: emails[i],
        subject: 'Santabot: For your eyes only',
        html: 'Hey ' + sender + ', Santabot here. The person that you are buying a Secret Santa present for is................................................................................................................. ' + recipient + '. Merry Christmas!',
   };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log(`Message sent: ${info.response}`);
    });

    if (recipient == undefined) { // If somebody doesn't get a pick, it'll tell you.
        console.log("Someone hasn't got a pick! Run this again, and tell everyone to ignore the previous message.");
    }
}
