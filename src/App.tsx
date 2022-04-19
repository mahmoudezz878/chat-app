import Nav from "./component/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/signup";
import HomePage from "./component/homePage";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
