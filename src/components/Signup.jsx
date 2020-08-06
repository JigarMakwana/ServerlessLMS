// Author - Jigar Makwana B00842568
import React, { Component } from 'react'
import google_icon from '.././images/google-icon.png'
import fb_icon from '.././images/facebook-icon.png'
import linkedin_icon from '.././images/linkedin-icon.png'
import github_icon from '.././images/github-icon.png'
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username:"",
            email: "",
            password: "",
            instituteName: "",
            securityQue: "",
            securityAns:"",
            emailErrorMsg: "",
            isEmailValid: false,
            isPswdvalid: false,
            isValid: false,
            validated: false,
            passwordErrorMsg: <div></div>,
        }

    }

    validateEmail = (email) => {
        if (email.length === 0) {
            this.setState({ isEmailValid: true});
            return ("")
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ isEmailValid: true});
            return ("")
        }
        this.setState({ isEmailValid: false});
        return ("Enter a valid email address.")
    }

    validatePassword = (password) => {
        var errorStr = ""

        if (password.length === 0) {
            errorStr = ""
            this.setState({ isPswdvalid: false});
            return (<small className="text-danger">{errorStr}</small>)
        }
        else if (/(?=.{6,})/.test(password) === false) {
            this.setState({ isPswdvalid: false});
            errorStr += "Password must be at least 6 characters long."
        }
        // else if (/(?=.*[a-z])/.test(password) === false) {
        //     this.setState({ isPswdvalid: false});
        //     errorStr += "\nPassword must contain at least 1 lowercase character."
        // }
        // else if (/(?=.*[A-Z])/.test(password) === false) {
        //     this.setState({ isPswdvalid: false});
        //     errorStr += "\nPassword must contain at least 1 uppercase character."
        // }
        // else if (/(?=.*[!@#\$%\^&\*])/.test(password) === false) {
        //     this.setState({ isPswdvalid: false});
        //     errorStr += "\nPassword must contain at least one special character."
        // }
        else {
            this.setState({ isPswdvalid: true});
        }
        return (<small className="text-danger">{errorStr}</small>)
    }

    handleUserNameChange = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        })
        // this.setState({
        //     email: event.target.value,
        //     emailErrorMsg: this.validateEmail(event.target.value)
        // })
    }

    handlePassChange = (event) => {
        this.setState({
            password: event.target.value,
            passwordErrorMsg: this.validatePassword(event.target.value)
        })
    }

    handleInstiNameChange = (event) => {
        this.setState({
            instituteName: event.target.value,
        })
    }

    handleSecQueChange = (event) => {
        this.setState({
            securityQue: event.target.value,
        })
    }

    handleSecAnsChange = (event) => {
        this.setState({
            securityAns: event.target.value,
        })
    }

    //Sign Up button click event
    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log("In submit handler");
        let url = "https://us-central1-dulcet-library-284522.cloudfunctions.net/registration";
        axios.post(url, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            instituteName: this.state.instituteName,
            securityQue: this.state.securityQue,
            securityAns: this.state.securityAns,
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data == "Success!")
                {
                    alert("Registration successful!\n" +
                        "Please Log In.");
                } else {
                    alert("Invalid Registration data.\n" +
                        "Please try again.");
                }
            }).catch(err => {
            console.log(err);
            alert("Invalid Registration data.\n" +
                "Please try a new email id.");
        })
        this.setState({ validated: true });
    };

    render() {
        var headerMessage, btnText;
        if (this.props.from === "SignupPage") {
            headerMessage = "Get Started for Free"
            btnText = "Start coding now"
        }
        else if (this.props.from === "LandingPage") {
            headerMessage = "Get Started"
            btnText = "Sign up for free"
        }
        return (
            <div className="container" align="left" style={{ position: "relative", marginTop: "6rem"}}>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="h4">{headerMessage}</h4>
                    </div>
                </div>
                <form className="form-group" noValidate validated={this.state.validated} onSubmit={this.mySubmitHandler}>
                    <div className="col-md-12 p-0">
                        <label className="label label-default font-weight-bold">Username</label>
                        <input
                            type="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleUserNameChange}
                            required></input>
                    </div>
                    <div className="col-md-12 p-0">
                        <label className="label label-default font-weight-bold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            required></input>
                        <small className="text-danger">{this.state.emailErrorMsg}</small>
                    </div>
                    <div className="col-md-12 p-0">
                        <label className="label label-default font-weight-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handlePassChange}
                            required></input>
                        <div>{this.state.passwordErrorMsg}</div>
                    </div>
                    <div className="col-md-12 p-0">
                        <label className="label label-default font-weight-bold">Institute Name</label>
                        <input
                            type="instituteName"
                            className="form-control"
                            value={this.state.instituteName}
                            onChange={this.handleInstiNameChange}
                            required></input>
                    </div>
                    <br/>
                    <div className="col-md-12 p-0">
                        <label className="label label-default font-weight-bold">Security Question</label>
                        <input
                            type="secQue"
                            className="form-control"
                            value={this.state.securityQue}
                            onChange={this.handleSecQueChange}
                            required></input>
                        {/*<DropdownButton id="dropdown-basic-button" title="Dropdown button">*/}
                        {/*    <Dropdown.Item>What is your mother's maiden name?</Dropdown.Item>*/}
                        {/*    <Dropdown.Item>Which is the first school you attended?</Dropdown.Item>*/}
                        {/*    <Dropdown.Item>Who is your favourite professor?</Dropdown.Item>*/}
                        {/*</DropdownButton>*/}
                    </div>
                    <br/>
                    <div className="col-md-12 p-0">
                        <label className="label label-default font-weight-bold">Security Answer</label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.state.securityAns}
                            onChange={this.handleSecAnsChange}
                            required></input>
                    </div>
                    <div className="col-md-12 p-0 mt-3">
                        {/*<Link to="/set-profile">*/}
                        {/*    <input type="submit" className="btn btn-primary w-100" style={{ height: "3rem", fontSize: "1.25rem" }} value={btnText}></input>*/}
                        {/*</Link>*/}
                        <input
                            type="submit"
                            className="btn btn-primary w-100"
                            style={{ height: "3rem", fontSize: "1.25rem" }}
                            value="Sign Up"></input>

                    </div>
                </form>
                <p className="text-muted">By signing up, you agree to DALServerlessLMS's <br/><a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a>.</p>

                <p className="font-weight-bold">Or, Sign Up with</p>
                <div className="row" style={{ width: "16rem" }}>
                    <button className="btn btn-default col col-xs-4"><img src={google_icon} /></button>
                    <button className="btn btn-default col col-xs-4"><img src={fb_icon} /></button>
                    <button className="btn btn-default col col-xs-4"><img src={linkedin_icon} /></button>
                    <button className="btn btn-default col col-xs-4"><img src={github_icon} /></button>
                </div>
            </div>
        )
    }

}

export default Signup


//Class component- rce
//Function component- rfce
//console.log - clg
//constructor - rconst


