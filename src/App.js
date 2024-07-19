import React from "react";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Components/Login/Login'
import Register from "./Components/Register/Register";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
