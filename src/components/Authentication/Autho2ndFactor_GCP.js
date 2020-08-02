// Author - Jigar Makwana B00842568
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.verifySecurityQA = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        // Received data
        const email = req.body.email;
        const securityQue = req.body.securityQue;
        const securityAns = req.body.securityAns;

        console.log("Test: " + email + ", " + securityQue + ", " + securityAns);

        // Get the collection reference
        const docRef = db.collection('userData').doc(email);

        // Read the added data in firestore
        const doc = await docRef.get();
        if (!doc.exists) {
            res.status(404).send("Eamil id is not registered.");
        } else {
            if((doc.get('securityQue') != null) && (doc.get('securityAns') != null)) {
                // console.log('Document data:', doc.data());
                data_securityQue= doc.data().securityQue;
                data_securityAns= doc.data().securityAns;
                console.log("This is securityQue: " + data_securityQue);
                console.log("This is securityAns: " + data_securityAns);
                if((data_securityQue == securityQue)
                    && (data_securityAns == securityAns))
                {
                    res.status(200).send("Success! Security QA matched");
                } else {
                    res.status(404).send("Security QA does not match.");
                }
            } else {
                console.log('securityQue or securityQue does not exist.');
                res.status(404).send("securityQue or securityQue does not exist.");
            }
        }
    }
};
