import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    role: "student", // default role
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let url = "";
    if (file) {
      try {
        url = await upload(file);
      } catch (err) {
        setError("File upload failed");
        console.log(err);
        
        return;
      }
    }

    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a ResearchConnect account</h1>
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label>Country</label>
          <input
            name="country"
            type="text"
            placeholder="USA"
            onChange={handleChange}
          />

          {/* Role Selection */}
          <label>Register as</label>
          <select name="role" value={user.role} onChange={handleChange} required>
            <option value="student">Student</option>
            <option value="professor">Professor</option>
          </select>

          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}

        </div>
      </form>
    </div>
  );
}

export default Register;
