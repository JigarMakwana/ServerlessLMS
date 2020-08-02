/* @Author - Jigar Makwana B00842568 */

import React, { Component } from 'react';
import logo from '../images/logo192.png'
import { Link } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import user from '../images/user_icon.png'
import Cookies from "js-cookie";
import Redirect from "react-router-dom/es/Redirect";
import axios from "axios";


class NavBarLoggedIn extends Component {
    constructor(props) {
        super(props);
        let isLoggedin = true;
        const userName = Cookies.get("username");
        if (userName == null) {
            isLoggedin = false;
        }
        this.state = {
            isLoggedin,
            username: userName,
            isLogoutClicked: false,
        };
    }

    onButtonClick = () => {
        console.log("in logout")
        const updateUserState = "https://jvnjnd1xw8.execute-api.us-east-1.amazonaws.com/updatestate/updateuserstate"
        if (this.state.isLoggedin) {
            const email = Cookies.get("email");
            console.log(email);
            axios.put(updateUserState, {
                email: email,
                value: 0
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
            Cookies.remove("email");
            Cookies.remove("username");
            this.setState({ isLoggedin: false, isLogoutClicked: true });
        } else {
            this.setState({ isLoggedin: false, isLogoutClicked: true });
        }
    };

    render() {
        if (this.state.isLogoutClicked) {
            return <Redirect to="/login" />;
        }

        return (
            <section>
                <header>
                    <Navbar className="navbar navbar-expand-md navbar-dark bg-dark shadow" style={{ position: "fixed", top: "0px", width: "100%", zIndex: 1000, height: "5rem" }}>
                        <section>
                            <Navbar.Brand className="header-info" href="/">
                                <img
                                    alt=""
                                    src={logo}
                                    width="40"
                                    height="40"
                                    className="align-top"
                                />{' '}
                                DALServerlessLMS
                            </Navbar.Brand>
                        </section>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <ul className="navbar-nav mr-auto">
                                <Nav.Link className="header-info" href="/">Home</Nav.Link>
                                <NavDropdown title="Our Services" id="basic-nav-dropdown">
                                    <Link to={`/chat/${this.state.username}`} style={{ textDecoration: "none" }}>
                                        <NavDropdown.Item href={`/chat/${this.state.username}`}>Chat</NavDropdown.Item>
                                    </Link>
                                    <Link to="/dataprocessing" style={{ textDecoration: "none" }}>
                                        <NavDropdown.Item href="/dataprocessing">Data Processing</NavDropdown.Item>
                                    </Link>
                                    <Link to="/ml" style={{ textDecoration: "none" }}>
                                        <NavDropdown.Item href="/ml">Machine Learning</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </ul>
                            <div className="col-md-3">
                                <ul className="navbar-nav">
                                    <li>
                                        <img
                                            alt=""
                                            src={user}
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top"
                                        />
                                        <a style={{ color: "white", fontSize: "20px" }} >
                                            {this.state.username}
                                        </a>
                                    </li>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <li className="nav-item">
                                        {/*<Link to="/signup">*/}
                                        <button className="btn btn-primary" onClick={this.onButtonClick} >Log Out</button>
                                        {/*</Link>*/}
                                    </li>
                                </ul>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            </section>
        );
    }
}

export default NavBarLoggedIn;
