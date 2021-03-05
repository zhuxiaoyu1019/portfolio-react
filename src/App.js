import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Landing from "./pages/Landing/Landing";
import About from "./pages/About/About";
import Portfolio from "./pages/Portfolio/Portfolio";
import Contact from "./pages/Contact/Contact";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

function App() {
  // gsap.registerPlugin(ScrollTrigger);



  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/rita">
            <div className="main">
              <Nav />
              {/* <Route exact path="/about"> */}
              <About />
              {/* </Route>
            <Route exact path="/portfolio"> */}
              <Portfolio />
              {/* </Route>
            <Route exact path="/contact"> */}
              <Contact />
              {/* </Route> */}
              <Footer />
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
