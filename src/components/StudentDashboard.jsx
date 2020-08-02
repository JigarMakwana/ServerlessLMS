import React, { Component } from 'react'
import CourseCard from './CourseCard'
import python_card from '.././images/python_card.jpg'
import javascript_card from '.././images/javascript_card.jpg'
import cpp_card from '.././images/cpp_card.jpg'
import GoPremium from './GoPremium'
import WelcomeCard from './WelcomeCard'
import PracticeCard from './PracticeCard'
import KitCard from './KitCard'
import kitimg1 from '../images/kit-img-1.png'
import kitimg2 from '../images/kit-img-2.png'
import kitimg3 from '../images/kit-img-3.png'
import NavBarLoggedIn from "./NavBarLoggedIn";
class StudentDashboard extends Component {
    render() {
        return (
            <div>
                <NavBarLoggedIn />
                <div className="p-5" style={{ top: "1rem", marginLeft: "3rem", marginRight: "0rem"}}>
                    <div className="row" style={{ position: "relative", top: "6rem" }}>
                        <div className="col-md-10 justify-content-center p-1">
                            <GoPremium />
                        </div>
                    </div>

                    <div className="row flex-wrap" style={{ position: "relative", top: "7rem" }}>
                        <div className="col-md-8 col-sm-12">
                            <WelcomeCard />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <PracticeCard />
                        </div>
                    </div>

                    <div className="row" style={{ marginBottom: "2rem", position: "relative", top: "9rem" }}>
                        <div className="col-md-12">
                            <p className="font-weight-bold text-left" style={{ fontSize: "1.5rem" }}>Starter Kit</p>
                        </div>
                        <div className="row container">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <KitCard img={kitimg1} bgcolor="#5F4B8BFF" txt="Take our Starter Quiz" />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <KitCard img={kitimg2} bgcolor="#696667FF" txt="Introduce yourself to our community" />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <KitCard img={kitimg3} bgcolor="#97BC62FF" txt="Start the 7-Day challenge" />
                            </div>
                        </div>
                    </div>

                    <div className="row container" style={{ position: "relative", top: "9rem", marginTop: "1rem", marginBottom: "4rem" }}>
                        <p className="font-weight-bold text-left" style={{ fontSize: "1.5rem", textAlign: "center" }}>My Courses</p>
                        <div className="d-flex flex-wrap" style={{position: "relative", justifyContent: "flex-start" }}>
                            <CourseCard imgsrc={python_card} coursename="Python 3.6 for Absolute Beginners" />
                            <CourseCard imgsrc={javascript_card} coursename="Modern JavaScript from Scratch" />
                            <CourseCard imgsrc={cpp_card} coursename="C++: From Beginner to Expert" />
                        </div>
                    </div>
                    {/*<a href="/analysis1" className="btn btn-primary">Analysis 1</a>*/}
                    {/*<br/>*/}
                    {/*<a href="/success2" className="btn btn-primary">Analysis 2</a>*/}
                </div>
            </div>
        )
    }
}

export default StudentDashboard
