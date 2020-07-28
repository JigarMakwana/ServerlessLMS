import React, { Component } from 'react';
import logo from '../images/logo192.png'
import { Link } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

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
                        <Nav.Link className="header-info" href="/">Home</Nav.Link>
                        <NavDropdown title="Our Services" id="basic-nav-dropdown">
                            <Link to="/chat">
                                <NavDropdown.Item href="#action/3.2">Chat</NavDropdown.Item>
                            </Link>
                            <Link to="/dataprocessing">
                                <NavDropdown.Item href="#action/3.3">Data Processing</NavDropdown.Item>
                            </Link>
                            <Link to="/ml">
                                <NavDropdown.Item href="#action/3.4">Machine Learning</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </ul>
                    <div className="col-md-3">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/login">
                                    <a className="nav-link active pr-5" href="#">Log in</a>
                                </Link>
                            </li>
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

// import React from 'react'
// import logo from '../images/logo192.png'
// import { Link } from 'react-router-dom'
//
// const NavigationBar = () => (
//     <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow" style={{ position: "fixed", top: "0px", width: "100%", zIndex: 1000, height: "5rem" }}>
//         <img src={logo} width="30" height="30" alt="logo" style={{ marginRight: "1rem" }}></img>
//         <Link to="/">
//             <a className="navbar-brand" href="#">DALServerlessLMS</a>
//         </Link>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav col-md-10">
//                 <li className="nav-item">
//                     <Link to="/">
//                         <a className="nav-link pr-5 pl-5" href="#">Home</a>
//                     </Link>
//                     {/* <span className="sr-only">(current)</span> */}
//                 </li>
//                 <li className="nav-item">
//                     <a className="nav-link pr-5" href="#">Our Services</a>
//                 </li>
//             </ul>
//             <div className="col-md-3">
//                 <ul className="navbar-nav">
//                     <li className="nav-item">
//                         <Link to="/login">
//                             <a className="nav-link active pr-5" href="#">Log in</a>
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/signup">
//                             <button className="btn btn-primary">Sign up</button>
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//
//     </nav>
// )
//
export default NavigationBar
