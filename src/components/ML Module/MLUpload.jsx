import React, { Component } from 'react'
import $ from 'jquery'
import NavBarLoggedIn from ".././NavBarLoggedIn";


export class MLUpload extends Component {

    constructor(props) {
        super(props)

        this.state = {
            counter: 10
        }

    }


    componentDidMount() {
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    }


    componentDidUpdate() {
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    }

    submitHandler = () => {
        document.getElementById('loader').style.display = 'block';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('successText').style.display = 'block';
        }, 8000)
    }

    render() {
        return (
            <div>
                <NavBarLoggedIn />
                <div className="container p-5">
                    <form style={{ marginTop: "200px" }}>
                        <div className="custom-file" style={{ width: "60%" }}>
                            <input type="file" className="custom-file-input" id="customFile" />
                            <label className="custom-file-label" htmlFor="customFile">Choose File</label>
                        </div>
                    </form>
                    <div className="container mt-5">
                        <button className="btn btn-outline-success" style={{ width: "20%" }} onClick={this.submitHandler}>Submit</button>
                    </div>
                    <div className="container mt-5" style={{ display: "none" }} id="loader">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="container mt-5" style={{ display: "none" }} id="successText">
                        <p className="lead">Analysis Completed!</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default MLUpload

/**
 * {
    "message":[
        {
            "messageBody": "sample test text",
            "timestamp" : "",
            "user":"krutin"
        },
        {
            "messageBody": "sample test text",
            "timestamp" : "",
            "user":"krutin"
        },
        {
            "messageBody": "sample test text",
            "timestamp" : "",
            "user":"krutin"
        }
    ]
}

from google.cloud import storage
import json
import cloudstorage as gcs
storage_client = storage.Client()

def writeFile(trainBucket, fileName, new_json_data):
    jsonfileData = readFileToTempStorage(trainBucket, fileName)
    return jsonfileData
    if jsonfileData == '':
        with open('/tmp/' + fileName, 'w') as json_file:
            json.dump(new_json_data, json_file)
        return True
    else:
        for i in jsonfileData["message"]:
            new_json_data["message"].append(i)
        with open('/tmp/' + fileName, 'w') as json_file:
            json.dump(new_json_data, json_file)
        return True

def readFileToTempStorage(bucketName, fileName):
    try:
        bucket = storage_client.bucket(bucketName)
        blob = bucket.blob(fileName)
        blob.download_to_filename('/tmp/' + fileName)
        with open('/tmp/' + fileName) as json_file:
            data = json.load(json_file)
            return data
    except:
        print('no such file')
        return ''

def hello_world(request):
    print(request)
    request_json = json.dumps(request.get_json())
    print(request_json)
    return writeFile('chat-module-messages', 'chat-module-history.json', request_json)

    bucket = storage_client.bucket('chat-module-messages')
    blob = bucket.blob('chat-module-history.json')
    blob.upload_from_filename('/tmp/' + 'chat-module-history.json')

 */