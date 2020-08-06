// Author - Jigar Makwana B00842568
import React, { Component } from 'react'
import Login from './Login'
import NavigationBar from "./NavigationBar";

export class LoginPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div className="container justfify-content-center">
                    <Login />
                </div>
            </div>
        )
    }
}

export default LoginPage
