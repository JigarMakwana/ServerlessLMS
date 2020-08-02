import React, { Component } from 'react'
import signupimage from ".././images/signup_image.png"
import Signup from './Signup'
import NavigationBar from "./NavigationBar";

export class SignupPage extends Component {
    render() {
        return (
            <div className="m-0">
                <NavigationBar />
                <div className="row justify-content-around">
                    <div className="col-md-4 col-sm-12">
                        <img src={signupimage} width="500px" className="img-fluid" style={{ position: "relative", top: "5rem" }}></img>
                    </div>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 col-sm-12 align-self-center">
                        <Signup from="SignupPage" />
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupPage
