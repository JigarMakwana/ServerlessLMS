const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const http = require("http");
var cors = require('cors');
const app = express();
app.use(cors())
app.use(bodyParser.json())

const file_upload = require('./components/Data Processing Module/FileUpload.js');
app.use('/upload_to_s3', file_upload.sign_s3);

const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => {
   console.log(`Server is running at PORT ${port}`);
});
