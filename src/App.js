import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavigationBar from "./components/NavigationBar";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard";
import CourseStartPage from "./components/CourseStartPage";
import SetProfilePage from "./components/SetProfilePage";
import DataProcessing from "./components/Data Processing Module/DataProcessing";
import Chat from "./components/Chat Module/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/student-dashboard" component={StudentDashboard} />
          <Route path="/course-page" component={CourseStartPage} />
          <Route path="/set-profile" component={SetProfilePage} />
          <Route path="/dataprocessing" component={DataProcessing} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
