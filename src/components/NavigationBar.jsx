import React, {Component} from 'react';
import logo from '../images/logo192.png'
import { Link } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = () => (
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
                    </ul>
                    <div className="col-md-3">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/login">
                                    <a className="btn btn-primary" href="#">Log in</a>
                                </Link>
                            </li>
                            &nbsp; &nbsp; &nbsp;
                            <li className="nav-item">
                                <Link to="/signup">
                                    <button className="btn btn-primary">Sign up</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </header>
    </section>
)

export default NavigationBar
