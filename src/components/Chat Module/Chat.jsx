import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
import { MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";
import { Popup } from "react-chat-elements";
import { Navbar } from "react-chat-elements";
import { SideBar } from 'react-chat-elements';
import { ChatList } from 'react-chat-elements';
import axios from "axios";
import { Link } from 'react-router-dom';
import NavBarLoggedIn from ".././NavBarLoggedIn";


export class Chat extends Component {
  constructor(props) {

    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return ev.returnValue = this.onUnload();
    });

    super(props);

    this.state = {
      inputMsg: "",
      msgSent: "",
      receivedMsgBody: "",
      receivedMsgTime: "",
      receivedMsgSender: "",
      msgListComponentData: [],
      userName: "",
      isNameEntered: false,
      onlineUsers: [],
      subscriber: '',
    };
  }

  onUnload = () => {
    alert('Bye!');
  }

  onSendClickPublish = () => {
    const publishRequestObj = {
      data: this.state.inputMsg,
      user: this.state.userName,
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
      });
  };

  retrieveMsg = () => {
    console.log(`Subscriber: ${this.state.subscriber}`)
    axios.post('https://us-central1-chat-module-284116.cloudfunctions.net/subscriber-poll-message', { "subscriber": 'test-subscription' })
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

          if (this.state.onlineUsers.includes(msgSender) == false) {
            this.setState({
              onlineUsers: this.state.onlineUsers.concat([msgSender])
            });
          }

          let msgPosition = "left";
          if (msgSender == this.state.userName) {
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

  createSubscription = () => {
    axios
      .post(
        'https://us-central1-chat-module-284116.cloudfunctions.net/create-subscription', { "user": this.state.userName })
      .then(res => {
        this.setState({
          subscriber: res.data.subscriber
        });
      })
      .then(res => {
        this.retrieveMsg();
      });

  }

  deleteSubscription = () => {
    axios
      .post(
        'https://us-central1-chat-module-284116.cloudfunctions.net/delete-subscription', { "subscription": this.state.subscriber })
      .then(res => {
        console.log(res);
      });
  }

  onEnterChat = () => {
    console.log(this.state.userName);
    document.getElementById('chat_loader').style.display = "block";
    document.getElementById('name_field').disabled = "true";
    this.createSubscription();

    setTimeout(() => {
      document.getElementById('chat_loader').style.display = "none";
      this.setState({
        isNameEntered: true
      })
    }, 3000)


  }

  redirectChat = () => {
    document.getElementById('chat_loader').style.display = "none";
  }

  handleNameEvent = (e) => {
    this.setState({
      userName: e.target.value,
    });
  }

  componentDidMount() {
    if (this.state.subscriber != '')
      this.retrieveMsg();
  }

  onInputChange = (e) => {
    this.setState({
      inputMsg: e.target.value,
    });
  };



  render() {

    if (this.state.isNameEntered == false) {
      return (
        <div>
          <NavBarLoggedIn />
          <div className="container" style={{ width: "100%" }}>
            <div className="card shadow p-3" style={{ width: "inherit", marginTop: "10rem" }}>
              <div className="row pl-3">
                <h5 class="lead">Start Chatting</h5>
              </div>
              <form autoComplete="off">
                <div className="form-group row p-3">
                  <div className="col-md-8 col-sm-12 p-0">
                    <input className="form-control"
                      id="name_field"
                      type="text" placeholder="Enter name"
                      onChange={this.handleNameEvent}
                      value={this.state.userName}></input>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <input className="btn btn-outline-success" onClick={this.onEnterChat} value="Enter Chat" readOnly></input>
                  </div>
                </div>
              </form>
              <div style={{ display: "none" }} id="chat_loader">
                <i class="fa fa-cog fa-spin" style={{ fontSize: "18px", marginRight: "1rem" }}></i>
              Please wait until we set up your chatting environment.
            </div>
            </div>
          </div>
        </div>

      );
    }


    else {
      return (
        <div>
          <NavBarLoggedIn />
          < div
            className="container pt-2 pb-2 col-md-7"
            style={{
              border: "1.2px solid black",
              borderRadius: "0.5rem",
              marginTop: "8rem"
            }
            }
          >

            <div style={{ marginBottom: "1rem" }}>
              <Navbar
                left={<div>DalServerlessLMS Chat</div>}
                right={
                  <Link to="/student-dashboard" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-danger" onClick={this.deleteSubscription}>Leave Chat</button>
                  </Link>} />
            </div>

            <div className="container row p-0 m-0">

              <div className="container col-md-4 col-sm-12 col-xs-12 p-2">

                {
                  this.state.onlineUsers.map(item => (
                    <ChatList
                      className='chat-list'
                      dataSource={
                        [
                          {
                            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png',
                            alt: 'User',
                            title: item,
                            subtitle: 'Joined the chat',
                            date: new Date(),
                            unread: 0,
                          }
                        ]
                      }
                    />
                  ))
                }

              </div>


              <div className="container p-2 chat-bg col-md-8 col-sm-12 col-xs-12" style={{ height: "350px", overflow: "auto" }}>
                <MessageList
                  className="message-list"
                  lockable={true}
                  toBottomHeight={"100%"}
                  dataSource={this.state.msgListComponentData}
                />
              </div>
            </div>

            <div className="container p-1">
              <div className="row">
                <div className="col-md-12 p-2">
                  <textarea class="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Type your message here"
                    rows="2" onChange={this.onInputChange}
                    value={this.state.inputMsg}
                    style={{ border: "1px solid black", width: "inherit" }}></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col pl-2 pr-2">
                  <button
                    className="btn btn-success"
                    onClick={this.onSendClickPublish}
                    style={{ width: "100%", height: "3rem" }}
                  >Send</button>
                </div>
              </div>
            </div>
          </div >
        </div>);
    }

  }
}

export default Chat;
