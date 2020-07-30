import React, { Component } from "react";
import axios from "axios";
import "../.././stylesheets/DataProcessing.css";
import ReactWordcloud from "react-wordcloud";

class DataProcessing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      errorMessage: "",
      display: false,
      words: "",
    };
  }

  displayWordCloud = async () => {
    var config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .get(
        "https://dalserverlesslms-yzyd5we5xa-uc.a.run.app/processfile",
        config
      )
      .then((res) => {
        this.setState({
          display: true,
          words: res.data,
          error: false,
        });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({
          error: true,
          errorMessage:
            "There is some issue in displaying the word cloud, try again later!",
        });
      });
  };

  handleChange = (ev) => {
    this.setState({ success: false, display: false });
  };

  btnClick = (e) => {
    e.preventDefault();

    this.displayWordCloud();
  };

  handleUpload = (ev) => {
    if (this.uploadInput.files.length !== 0) {
      let file = this.uploadInput.files[0];
      // Split the filename to get the name and type
      let fileParts = this.uploadInput.files[0].name.split(".");
      let fileName = fileParts[0];
      let fileType = fileParts[1];

      var config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };

      console.log("Preparing the upload");
      axios
        .post(
          "http://localhost:3001/upload_to_s3",
          {
            fileName: fileName,
            fileType: fileType,
          },
          config
        )
        .then((response) => {
          var returnData = response.data.data.returnData;
          var signedRequest = returnData.signedRequest;
          console.log("Recieved a signed request " + signedRequest);

          var options = {
            headers: {
              "Content-Type": fileType,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          };
          axios
            .put(signedRequest, file, options)
            .then((result) => {
              console.log("Response from s3");
              this.setState({ success: true, error: false, errorMessage: "" });
            })
            .catch((error) => {
              console.log(JSON.stringify(error));
              this.setState({
                error: true,
                errorMessage:
                  "File upload failed because of expired AWS token, please update the tokens and try again!",
              });
            });
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          this.setState({
            error: true,
            errorMessage:
              "File upload failed because of expired AWS token, please update the tokens and try again!",
          });
        });
    } else {
      this.setState({
        error: true,
        errorMessage: "Please select a file before uploading!",
      });
    }
  };

  render() {
    const SuccessMessage = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: "green" }}>File Uploaded successfully!</h3>
        <button type="submit" onClick={this.btnClick} class="btn btn-primary btn-change">
          Display Word Cloud
        </button>
      </div>
    );

    const ErrorMessage = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: "red" }}>{this.state.errorMessage}</h3>
        <br />
      </div>
    );

    const WordCloud = () => (
      <div style={{ height: 800, width: 1200 }}>
        <ReactWordcloud words={this.state.words} />
      </div>
    );

    return (
      <div className="DataProcessing">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Upload a File for processing</h1>
        <input
          onChange={this.handleChange}
          ref={(ref) => {
            this.uploadInput = ref;
          }}
          type="file"
        />
        <br />
        <button onClick={this.handleUpload}>UPLOAD</button>
        {this.state.success ? <SuccessMessage /> : null}
        {this.state.error ? <ErrorMessage /> : null}
        {this.state.display ? <WordCloud /> : null}
      </div>
    );
  }
}

export default DataProcessing;
