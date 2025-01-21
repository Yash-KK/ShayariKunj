import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Submit from "./pages/Submit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
