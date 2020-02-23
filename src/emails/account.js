const mailgun = require("mailgun-js");
const DOMAIN = "sandbox19b09808666d4226a716dd05b296554b.mailgun.org";
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

const sendWelcomeEmail = async (email, name) => {
    const dataForMail = {
        to: email,
        from: 'shobhitmaheshwari18@gmai.com',
        subject: 'Testing!',
        text: `Welcome to the app, ${name}, let me know how you get along with the app.`,

    }
    // mg.messages().send(dataForMail, function (error, body) {
    //     if (error) {
    //         console.log(error)

    //     } else {
    //         console.log(body)
    //     }
    // })
    try {
        await mg.messages().send(dataForMail)

    } catch (e) {

    }
}

const cancelEmail = async (email, name) => {
    const dataForMail = {
        to: email,
        from: 'shobhitmaheshwari18@gmail.com',
        subject: 'We\'ll miss you.',
        text: `Goodbye, ${name}!`
    }
    // mg.messages().send(dataForMail, function (error, body) {
    //     if (error) {
    //         console.log(error)

    //     } else {
    //         console.log(body)
    //     }
    // })
    try {
        await mg.messages().send(dataForMail)

    } catch (e) {
    }
    
}

/*
const data = {
	from: "Mailgun Sandbox <postmaster@sandbox19b09808666d4226a716dd05b296554b.mailgun.org>",
	to: "shobhitmaheshwari18@gmail.com",
	subject: "Hello",
    text: "Testing some Mailgun awesomness!",
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});
*/

module.exports = {
    sendWelcomeEmail,
    cancelEmail,
}