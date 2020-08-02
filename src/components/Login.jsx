// Author - Jigar Makwana B00842568
import React, { Component } from 'react'
import google_icon from '.././images/google-icon.png'
import fb_icon from '.././images/facebook-icon.png'
import linkedin_icon from '.././images/linkedin-icon.png'
import github_icon from '.././images/github-icon.png'
import { Link } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            securityQ: "",
            securityA: "",
            isLoggedIn: false,
            isInvalidCred: false,
            emailErrorMsg: ""
        }
    }

    validateEmail = (email) => {
        if (email.length === 0) {
            return ("")
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return ("")
        }
        return ("Enter a valid email address.")
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
            emailErrorMsg: this.validateEmail(event.target.value)
        })
    }

    handlePassChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleSecurityQ = (event) => {
        this.setState({
            securityQ: event.target.value
        })
    }

    handleSecurityA = (event) => {
        this.setState({
            securityA: event.target.value
        })
    }

    //Login button click handler
    mySubmitHandler = (event) => {
        console.log("Login Clicked!");
        event.preventDefault();
        let LambdaAPI_URL = "https://hus4rgqpq5.execute-api.us-east-1.amazonaws.com/user/auth";
        axios.post(LambdaAPI_URL, {
            email: this.state.email,
            password: this.state.password,
            securityQue: this.state.securityQ,
            securityAns: this.state.securityA
        })
            .then(res => {
                console.log(res.data);
                console.log(res.data.success);
                if (res.data.success == true) {
                    let user = this.state.email.split('@');
                    let username = user[0].replace(/[^a-zA-Z ]/g, " ");
                    Cookies.remove("email");
                    Cookies.remove("username");
                    Cookies.set("email", this.state.email);
                    Cookies.set("username", username);
                    let updateUserState = "https://jvnjnd1xw8.execute-api.us-east-1.amazonaws.com/updatestate/updateuserstate"
                    axios.put(updateUserState, {
                        email: this.state.email,
                        value: 1
                    })
                        .then(res => {
                            console.log(res.data);
                            console.log(res.data.success);
                            if (res.data.success == true) {
                                console.log("Update Success!");
                            } else {
                                throw new Error("Update unsuccessful.");
                            }
                        }).catch(err => {
                        console.log(err);
                    })

                    this.setState({ isLoggedIn: true, isInvalidCred: false });
                    console.log("success!");
                } else {
                    this.setState({ isInvalidCred: true })
                    throw new Error("Invalid email or password");
                }
            }).catch(err => {
            console.log(err);
            this.setState({ isInvalidCred: true })
        })
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to="/student-dashboard" />
        }

        let errMsg = this.state.isInvalidCred ?
            <span style={{color: "#dc3545" }}>
                <span style={{ fontWeight: "bold" }}> &nbsp; &nbsp; Invalid credentials. Please try again.</span></span> :
            null;

        return (
            <div className="m-0">
                <div className="container col-md-5 col-sm-6 col-xs-12" align="left" style={{position: "relative", top: "10rem"}}>
                    <h4 className="h4">Log In to DALServerlessLMS</h4>
                    <br />
                    <form onSubmit={this.mySubmitHandler} className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label className="label label-default font-weight-bold">Email</label>
                            </div>
                            <div className="col-md-12">
                                <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange}></input>
                                <small className="text-danger">{this.state.emailErrorMsg}</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="label label-default font-weight-bold">Password</label>
                            </div>
                            <div className="col-md-12">
                                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassChange}></input>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="label label-default font-weight-bold">Security Question</label>
                            </div>
                            <div className="col-md-12">
                                <input type="text" className="form-control" value={this.state.securityQ} onChange={this.handleSecurityQ}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="label label-default font-weight-bold">Security Answer</label>
                            </div>
                            <div className="col-md-12">
                                <input type="password" className="form-control" value={this.state.securityA} onChange={this.handleSecurityA}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mt-2">
                                <a href="#" className="text-muted font-weight-bold">Forgot password?</a>
                            </div>
                            <br/>
                            {errMsg}
                        </div>
                        <div className="row">
                            <div className="col-md-12 mt-3">
                                {/*<Link to="/student-dashboard">*/}
                                <input type="submit" className="btn btn-primary w-100" style={{ height: "3rem", fontSize: "1.25rem" }} value="Log in"></input>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="font-weight-bold">Login with another account</p>
                        </div>
                    </div>
                    <div className="row" style={{ width: "16rem" }}>
                        <button className="btn btn-default col col-xs-4"><img src={google_icon} className="img-fluid" /></button>
                        <button className="btn btn-default col col-xs-4"><img src={fb_icon} className="img-fluid" /></button>
                        <button className="btn btn-default col col-xs-4"><img src={linkedin_icon} className="img-fluid" /></button>
                        <button className="btn btn-default col col-xs-4"><img src={github_icon} className="img-fluid" /></button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login



