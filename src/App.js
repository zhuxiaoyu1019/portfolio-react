import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import About from "./pages/About/About";
import Portfolio from "./pages/Portfolio/Portfolio";
import Contact from "./pages/Contact/Contact";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import "./App.scss";

const App = () => {
  const [clickState, setClickState] = useState({
    about: false,
    portfolio: false,
    contact: false,
  });

  return (
    <>
      <Router>
        <Landing clickState={clickState} setClickState={setClickState} />
        <Route exact path="/">
          <div className="main">
            <Nav clickState={clickState} setClickState={setClickState} />
            <About clickState={clickState} setClickState={setClickState} />
            <Portfolio clickState={clickState} setClickState={setClickState} />
            <Contact clickState={clickState} setClickState={setClickState} />
            <Footer />
          </div>
        </Route>
      </Router>
    </>
  );
}

export default App;
