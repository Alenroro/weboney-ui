import React, { useState, useEffect } from "react";
import "./profilePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  console.log(data);

  const [profile, setProfile] = useState(null);
  console.log(profile);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    password: "",
    place: "",
  });

  const emailData = localStorage.getItem("emailvalue");

  const fetchData = async () => {
    try {
      let response = await axios.get("http://localhost:3500/user/login");
      const Datas = response.data;
      const successData = Datas.find((data) => data.email === emailData);
      setData(Datas);
      setProfile(successData);
      if (successData) {
        setUpdatedData({
          name: successData.name,
          email: successData.email,
          password: successData.password,
          place: successData.place,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    nav("/");
  };
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleClick = async (_id) => {
    try {
      await axios.post(`http://localhost:3500/user/edit`, {
        _id,
        ...updatedData,
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (_id) => {
    console.log(_id);
    try {
      const response = await axios.post(`http://localhost:3500/user/delete/`, {
        _id,
      });
      console.log(response.data);
      fetchData();
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="profilepage">
        <header>
          <h1 className=" clr">PROFILE</h1>
          <div className="gap"></div>
          <button onClick={handleLogout}>LogOut</button>
        </header>
        <section>
          <div className="data-head">
            <h2>Personal Data</h2>
            <hr className="clr" />
          </div>
          <form>
            {profile ? (
              <>
                <div class="data-box">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={updatedData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                  />
                </div>
                <div class="data-box">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={updatedData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                  />
                </div>
                <div class="data-box">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={updatedData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                  />
                </div>
                <div class="data-box">
                  <label htmlFor="place">Place</label>
                  <input
                    type="text"
                    id="place"
                    name="place"
                    value={updatedData.place}
                    onChange={handleChange}
                    placeholder="Enter Your Place"
                  />
                </div>
                <div class="data-box">
                  <button onClick={() => handleClick(profile._id)}>Update</button>
                  <button onClick={() => handleDelete(profile._id)}>
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <p>No data Found</p>
            )}
          </form>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
