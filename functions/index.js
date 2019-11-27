/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
let functions = require('firebase-functions');
let admin = require('firebase-admin');
const nodemailer = require('nodemailer');
let serviceAccount = require('./vizkard-bb042-firebase-adminsdk-3424h-63fe1916bc')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://vizkard-bb042.firebaseio.com/'
});


exports.sendFriendRequest = functions.database.ref('/friend_requst_function/{userId}/{friend_requst_functionId}').onCreate((snapshot, context) => {
    const data = snapshot.val();
    const senderId = context.params.userId
    console.log("FriendRequestUserId: ", senderId);

    const receiverId = data.accepter_id
    console.log("FriendRequestAccecpterID: ", receiverId);  //Y2fDghYY


    return admin.database().ref("/message_token/" + senderId).once('value').then(snap => {
        const senderName = snap.child("name").val();
        console.log("Sender_Name :", senderName);


        return admin.database().ref("/message_token/" + receiverId).once('value').then(snap => {
            const token = snap.child('messaging_token').val();
            console.log("token: ", token);



            const payload = {
                notification: {
                    data_type: "direct_message",
                    title: "Friend Request",
                    body: `${senderName} sent a friend request`,

                },

            };
            let options = { priority: "high" };

            return admin.messaging().sendToDevice(token, payload, options)
                .then(function (response) {
                    console.log("Successfully sent message:", response);
                    console.log(response.results[0].error);

                })
                .catch(function (error) {
                    console.log("Error sending message:", error);

                });

        });
    });
});

exports.sendNotification = functions.database.ref('/messages1/{userId}/{messageId}').onCreate((snapshot, context) => {
    // const messageID = context.params.userId
    const data = snapshot.val()
    //get the userId of the person receiving the notification because we need to get their token
    const senderId = context.params.userId
    console.log("receiverId: ", senderId);  //9Ce

    //get the user id of the person who sent the message
    // const senderId = snapshot.data.child('user_id').val();
    const receiverId = data.user_id
    console.log("senderId: ", receiverId);  //Y2fDghYY

    //get the message
    // const message = snapshot.data.child('message').val();
    const message = data.message
    console.log("message: ", message);

    //get the message id. We'll be sending this in the payload
    const messageId = context.params.messageId;
    console.log("messageId: ", messageId);

    //query the users node and get the name of the user who sent the message
    return admin.database().ref("/message_token/" + senderId).once('value').then(snap => {
        const senderName = snap.child("name").val();
        console.log("senderName: ", senderName);

        //get the token of the user receiving the message
        // eslint-disable-next-line promise/no-nesting
        return admin.database().ref("/message_token/" + receiverId).once('value').then(snap => {
            const token = snap.child("messaging_token").val();
            console.log("token: ", token);

            //we have everything we need
            //Build the message payload and send the message
            console.log("Construction the notification message.");

            const payload = {
                notification: {
                    data_type: "direct_message",
                    title: "New Message from " + senderName,
                    body: message,
                    // click_action: "fcm.ACTION.HELLO",

                },

            };
            let options = { priority: "high" };

            // eslint-disable-next-line promise/no-nesting
            return admin.messaging().sendToDevice(token, payload, options)
                // eslint-disable-next-line promise/always-return
                // eslint-disable-next-line prefer-arrow-callback
                .then(function (response) {
                    console.log("Successfully sent message:", response);
                    console.log(response.results[0].error);
                })
                // eslint-disable-next-line prefer-arrow-callback
                .catch(function (error) {
                    console.log("Error sending message:", error);
                });

        });
    });
});

exports.sendEmail = functions.database.ref('/messages1/{userId}/{messageId}').onCreate((snapshot, context) => {


    const data = snapshot.val()
    const senderId = context.params.userId
    console.log("SenderId: ", senderId);  //9Ce

    const receiverId = data.user_id
    console.log("ReceiverId: ", receiverId);  //Y2fDghYY

    const message = data.message
    console.log("message: ", message);

    const SenderName = data.SenderName
    console.log("SenderName: ", SenderName);

    const SenderEmail = data.SenderEmail
    console.log("SenderEmail: ", SenderEmail);


    const ReceiverEmail = data.ReceiverEmail
    console.log("ReceiverEmail: ", ReceiverEmail);



    let transporter = nodemailer.createTransport({
        service: 'Gmail',

        // secure: true, // use TLS
        auth: {
            user: 'vizkardapp@gmail.com',
            pass: '12345678vizkard'
        },

    });

    const mailOptions = {
        from: "vizkardapp@gmail.com",
        to: ReceiverEmail,
        subject: `${SenderName} sent you a new message from Vizkard `, // email subject
        html: ` <p style="font-size: 16px;"> ${message}</p>  
        <br />
        <br />
      
        <p style="font-style: italic"> reply with his email ${SenderEmail} or send message from vizkard application </p>  
        `
    };

    return transporter.sendMail(mailOptions, (erro, info) => {
        if (erro) {
            return console.log(erro)


        } else {

            return console.log('sended', info.response)
        }
    });
});

exports.sendGroupNotification = functions.database.ref('/group_notification/{userId}/{messageId}').onCreate((snapshot, context) => {

    const data = snapshot.val();
    const senderId = context.params.userId
    console.log("receiverId: ", senderId);
    const Sender_Name = data.Sender_name;
    console.log("Sender_Name: ", Sender_Name);
    const group_name = data.group_name;
    console.log("group_name: ", group_name);
    const message = data.message;
    console.log("message: ", message);
    const from = data.from;
    const group_member = data.group_member
    console.log(group_member, 'groupMemer');


    for (var i = 0; i < group_member.length; i++) {
        if (group_member[i] === from) {
            group_member.splice(i, 1);
        }
    }
    console.log(group_member, 'new Memer');


    return group_member.forEach((element) => {
        if (element) {
            const token = [];
            return admin.database().ref('/message_token/' + element).once('value').then(snap => {
                const alltokens = snap.child("messaging_token").val();
                token.push(alltokens);
                const payload = {
                    notification: {
                        data_type: "direct_message",
                        title: "New Message from " + group_name,
                        body: message,
                        // click_action: "fcm.ACTION.HELLO",
                    },
                };
                let options = { priority: "high" };
                return admin.messaging().sendToDevice(token, payload, options)
                    .then(function (response) {
                        console.log("Successfully sent message:", response);
                        console.log(response.results[0].error);
                    })
                    .catch(function (error) {
                        console.log("Error sending message:", error);
                    });
            });
        }
    });
});