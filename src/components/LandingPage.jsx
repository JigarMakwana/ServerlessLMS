import NavigationBar from './NavigationBar'
import Signup from './Signup'
import stacklearner from '.././images/stacklearner.png'
import React from 'react'
import google_icon from "../images/google-icon.png";
import fb_icon from "../images/facebook-icon.png";
import linkedin_icon from "../images/linkedin-icon.png";
import github_icon from "../images/github-icon.png";

function LandingPage() {
    return (
        <div className="m-0">
            <NavigationBar />
            <div className="row justify-content-around">
                <div className="col-md-4 col-sm-12">
                    <img src={stacklearner} width="500px" className="img-fluid" style={{ position: "relative", top: "4rem" }}></img>
                </div>

                <div className="col-md-4">
                    <div className="row" style={{ width: "16rem" }}>
                        <button className="btn btn-default col col-xs-4"><img src={google_icon} /></button>
                        <button className="btn btn-default col col-xs-4"><img src={fb_icon} /></button>
                        <button className="btn btn-default col col-xs-4"><img src={linkedin_icon} /></button>
                        <button className="btn btn-default col col-xs-4"><img src={github_icon} /></button>
                    </div>
                </div>

                <div className="col-md-4 col-sm-12 align-self-center">
                    <span> Hello</span>

                    <Signup from="LandingPage"></Signup>
                </div>

            </div>

        </div>
    )
}

export default LandingPage
