import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
