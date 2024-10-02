import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");
  const navigate = useNavigate();

  const credentials = {
    Admin: { userId: "adminUser", password: "adminPass" },
    "PDI Tester": { userId: "pdiUser", password: "pdiPass" },
    "Hydro Tester": { userId: "hydroUser", password: "hydroPass" },
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      userId === credentials[selectedRole].userId &&
      password === credentials[selectedRole].password
    ) {
      switch (selectedRole) {
        case "Admin":
          navigate("/admin", { state: { role: selectedRole } });
          break;
        case "Hydro Tester":
          navigate("/hydro", { state: { role: selectedRole } });
          break;
        case "PDI Tester":
          navigate("/pdi", { state: { role: selectedRole } });
          break;
        default:
          break;
      }
    } else {
      alert("Invalid User ID or Password!");
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center overflow"
      style={{ backgroundImage: 'url("")' }}
    >
      <div className="flex-1 flex flex-col justify-center p-10 text-gray-900">
        <h1 className="text-5xl font-bold mb-5">Welcome To Hi-Tech</h1>
        <p className="text-lg mb-10">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <div className="flex space-x-5 ml-10">
          <a
            href="https://www.instagram.com/accounts/login/?hl=en"
            className="bg-gray-700 p-4 rounded-full text-white hover:bg-orange-500 transition-all"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/accounts/login/?hl=en"
            className="bg-gray-700 p-4 rounded-full text-white hover:bg-orange-500 transition-all"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/accounts/login/?hl=en"
            className="bg-gray-700 p-4 rounded-full text-white hover:bg-orange-500 transition-all"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center p-16 bg-white bg-opacity-80">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-8">Sign in</h2>
          <select
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="PDI Tester">PDI Tester</option>
            <option value="Hydro Tester">Hydro Tester</option>
          </select>
          <input
            type="text"
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center mb-4">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-600">
              Remember Me
            </label>
          </div>
          <button
            className="w-full p-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            onClick={handleLogin}
          >
            Sign in now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
