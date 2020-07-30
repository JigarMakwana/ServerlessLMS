require('dotenv').config();
var aws = require('aws-sdk');


aws.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_SECRET_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
})
const UPLOADED_FILES_S3_BUCKET = 'uploaded-files-dal-serverless-lms'

console.log(process.env.ACCESS_KEY_ID);
console.log(process.env.ACCESS_SECRET_KEY);
console.log(process.env.AWS_SESSION_TOKEN);


// reffered to the article https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689 while writing the below code
exports.sign_s3 = (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    const fileFullName = fileName + '.' + fileType;
    const s3Params = {
        Bucket: UPLOADED_FILES_S3_BUCKET,
        Key: fileFullName,
        Expires: 50,
        ContentType: fileType,
        ACL: 'public-read'
    };
    console.log("came to backend")
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ success: false, error: err })
        }

        const returnData = {
            signedRequest: data,
            url: `https://${UPLOADED_FILES_S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.json({ success: true, data: { returnData } });
    });
}
