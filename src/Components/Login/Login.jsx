import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const nav = useNavigate();

  const handleRegister = () => {
    nav("/Register");
  }

  const [loginData,setloginData] = useState({
      email:"",
      password:""
  })
  console.log(loginData)
  const handleChange=(e)=>{
      setloginData({...loginData,[e.target.name]:e.target.value})
  }

  const handleSubmit= async(e)=>{
       e.preventDefault()
      try{
           let response= await axios.get("http://localhost:3500/user/login")
           const login = response.data
           
           const successlogin = login.find(task=>task.email === loginData.email && task.password === loginData.password)
           if(successlogin){
              localStorage.setItem("emailvalue",loginData.email)
              nav("/Profile");
           }
           else{
            alert("user not found")
           }
          
      }
      catch(err){
          console.log(err)
      }
  }
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <form>
            <h2>LOGIN</h2>
            <input type="text" placeholder="Enter Your Email" name='email' value={loginData.email} onChange={handleChange} />
            <input
              type="password"
              placeholder="Enter Your Password"
              name='password' value={loginData.password} onChange={handleChange}
            />
            <button onClick={handleSubmit}>SignIn</button>
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
