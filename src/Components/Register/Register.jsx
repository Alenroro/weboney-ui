import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./register.css";
import axios from "axios";
const Register = () => {
  const Navigate = useNavigate();
  const handleBackToLogin = () => {
    Navigate("/");
  };
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (value.name !== "" && value.email !== "" && value.password !== "") {
      try {
        await axios.post("http://localhost:3500/user/", value);
        setValue({
          name: "",
          email: "",
          password: "",
        });
        Navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill the details");
    }
  };
  return (
    <>
      <div className="reg-page">
        <div className="reg-box">
          <form>
            <h2>REGISTER</h2>
            <input
              type="text"
              placeholder="Enter your Name"
              name="name"
              value={value.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter Your Email"
              name="email"
              value={value.email}
              onChange={handleChange}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={value.password}
              onChange={handleChange}
              required
            />

            <button onClick={handleRegister}>Register</button>
            <button onClick={handleBackToLogin}>Back To Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
