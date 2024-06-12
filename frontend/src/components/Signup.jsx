/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Heading from "./UI/Heading";
import Button from "./UI/Button";
import Modal from "./UI/Modal";

export default function Signup() {
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setFormData(updatedFormData);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/signup",
        updatedFormData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      setIsModalOpen(false);
    } catch (e) {
      setError(true);
      setIsModalOpen(true);
      setErrorMessage(e.response.data.message);
    }
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [navigate, token]);

  return (
    <div className="flex items-center justify-center">
      {error && (
        <Modal
          isOpen={isModalOpen}
          errorMessage={errorMessage}
          onClose={() => {
            setIsModalOpen(false);
            setError(false);
          }}
        />
      )}
      <div className="mt-16 bg-white w-1/4 border rounded-lg p-5 shadow-2xl">
        <Heading label={`Sign${" "}Up`} />
        <p className="mt-4 text-center">
          Enter your information to create an account
        </p>

        <form className="mt-8 flex flex-col">
          <label htmlFor="firstName" className="font-semibold">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            ref={firstNameRef}
            className="p-2 border border-gray-200 rounded-md mt-2"
            placeholder="First Name"
          />

          <label htmlFor="lastName" className="font-semibold mt-2">
            LastName
          </label>
          <input
            type="text"
            name="lastName"
            ref={lastNameRef}
            className="p-2 border border-gray-200 rounded-md mt-2"
            placeholder="Last Name"
          />
          <label htmlFor="email" className="font-semibold mt-2">
            Email
          </label>

          <input
            type="text"
            name="email"
            ref={emailRef}
            className="p-2 border border-gray-200 rounded-md mt-2"
            placeholder="Email"
          />
          <label htmlFor="password" className="font-semibold mt-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            className="p-2 border border-gray-200 rounded-md mt-2"
            placeholder="Password"
          />
          <Button label={`Sign ${" "}Up`} handleSubmit={handleSubmit} />
        </form>
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 cursor-pointer">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
