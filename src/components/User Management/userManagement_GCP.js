const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
var request = require('request');

exports.validateReg = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        var isEmailValid = false;
        var isEmailRegistered = true;
        var isLambdaValid = true;

        // Received data
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const instituteName = req.body.instituteName;
        const securityQue = req.body.securityQue;
        const securityAns = req.body.securityAns;

        console.log("Test: " + username + ", " + email + ", " + password);
        console.log("Test: " + instituteName + ", " + securityQue + ", " + securityAns);

        // Validate email
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            isEmailValid = true;
        }

        // Get the collection reference
        const docRef = db.collection('userData').doc(email);

        // Read the added data in firestore
        const doc = await docRef.get();
        if (!doc.exists) {
            console.log('Eamil id is not registered and can be added now!');
            isEmailRegistered = false;
        } else {
            console.log('Document data:', doc.data());
            console.log('Eamil id is already registered.');
            isEmailRegistered = true;
        }

        // If email valid call lambda and store to firestore
        if(isEmailValid && !isEmailRegistered)
        {
            const data = {
                "body": {
                    "username" : username,
                    "password": password,
                    "email" : email,
                    "instituteName" : instituteName,
                    "securityQue" : securityQue,
                    "securityAns" : securityAns
                }
            }
            const lamdaAPIGateway = "https://w15pg5i65e.execute-api.us-east-1.amazonaws.com/user/register";

            // make the request
            request.post({
                url:  lamdaAPIGateway,
                body: data,
                json: true
            }, function(error, response, body){
                if(!error && response.statusCode == 200) {
                    console.log(body);
                    isLambdaValid = true;
                } else {
                    console.log(error);
                    isLambdaValid = false;
                }
            });

            // If valid store to Security QA to firestore
            if(isLambdaValid)
            {
                console.log("Inserting the email id to database");
                // Add the data in firestore
                docRef.set({
                    securityQue: securityQue,
                    securityAns: securityAns
                });
                console.log("Data is inserted in the database");
                res.status(200).send("Success!");
            } else {
                console.log("Data is not inserted in the database");
                res.status(404).send("Data is not inserted in the database");
            }
        } else {
            console.log("Email id is not valid");
            res.status(404).send("Email id is not valid.");
        }
    }
};
