import SignUp from "./component/SignUp";
import Nav from "./component/Nav/Nav";
import LogIn from "./component/LogIn";
import Footer from "./component/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import  io  from "socket.io-client";
import { useEffect } from "react";

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
