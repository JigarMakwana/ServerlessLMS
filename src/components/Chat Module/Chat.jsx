import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
import { MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";
import { Popup } from "react-chat-elements";
import { Navbar } from "react-chat-elements";
import axios from "axios";

export class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputMsg: "",
      msgSent: "",
      receivedMsgBody: "",
      receivedMsgTime: "",
      receivedMsgSender: "",
      msgListComponentData: []
    };
  }

  onSendClickPublish = () => {
    const publishRequestObj = {
      data: this.state.inputMsg,
      user: "Devarshi",
    };



    axios
      .post(
        'https://us-central1-chat-module-284116.cloudfunctions.net/publish-message',
        publishRequestObj
      )
      .then((res) => {
        console.log(`Response from publish: ${JSON.stringify(res)}`);
        this.setState({
          inputMsg: ""
        });

        console.log(`Input message state: ${this.state.inputMsg}`);
      });
  };

  retrieveMsg = () => {
    axios.get('https://us-central1-chat-module-284116.cloudfunctions.net/subscriber-poll-message')
      .then(res => {
        console.log(`Response from pulling: ${JSON.stringify(res)}`);
        const messageList = res.data.messages;
        this.setState({
          msgListComponentData: []
        });
        for (let i = 0; i < messageList.length; i++) {
          let msgBody = messageList[i].messageBody;
          let msgTime = messageList[i].timestamp;
          let msgSender = messageList[i].user;
          let msgPosition = "left";
          if(msgSender == "Devarshi") {
            msgPosition = "right"
          }
          let newMsgComponent = {
            position: msgPosition,
            title: msgSender,
            type: "text",
            text: msgBody,
            date: new Date(msgTime),
          }

          this.setState({
            msgListComponentData: this.state.msgListComponentData.concat([newMsgComponent])
          });
        }
        setTimeout(this.retrieveMsg, 3000);
      });
  };

  componentDidMount() {
    this.retrieveMsg();
  }

  onInputChange = (e) => {
    this.setState({
      inputMsg: e.target.value,
    });
  };

  render() {
    return (
      <div
        className="container p-2"
        style={{
          border: "1.2px solid black",
          borderRadius: "0.5rem",
          padding: "2rem",
          marginTop: "8rem",
          width: "50rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <Navbar left={<div>DalServerlessLMS Chat</div>} />
        </div>

        <div className="container p-2 chat-bg" style={{ height: "350px", overflow: "auto" }}>
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={this.state.msgListComponentData}
          />
        </div>

        <div className="container p-1">
          <div className="row">
            <div className="col-md-12 p-2">
              <textarea class="form-control"
                id="exampleFormControlTextarea1"
                rows="2" onChange={this.onInputChange}
                value={this.state.inputMsg}
                style={{ border: "1px solid black", width: "inherit" }}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col pl-2">
              <button
                className="btn btn-success"
                onClick={this.onSendClickPublish}
                style={{width: "100%", height: "3rem"}}
              >Send</button>
            </div>
          </div>


        </div>



      </div>
    );
  }
}

export default Chat;
