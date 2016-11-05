This is Santabot, an application built in JavaScript to randomly allocate each person in a given list with another person and let them know via e-mail, so that they can buy them a Secret Santa gift. 

This program requires Nodemailer and node.js in order to function. Install node.js on your computer, then navigate via the terminal to the folder where this is located and run node santabot.js to execute the random allocation process.

You can send the Secret Santa e-mails from any Gmail account, but you need to enable support for less secure apps within the account's settings in order for the sending of these emails to take place. Also, the account's username and password will be placed in the top of the JavaScript file. For this reason, I would recommend that you use a dedicated Gmail account for this purpose.

If you want to avoid two people from being picked with one another (e.g. if they are a couple and don't want to be matched together), you can use the avoidThem function inside the for loop by using:

	 avoidThem("person1","person2");

This will be commented out on line 76.

Thank you to @thisDaveJ for insipration with the Nodemailer Gmail mail options, and Fisher-Yates for producing a brilliant number shuffling system without replacement. This enabled me to produce a random number generator system with replacement.

- Darryl