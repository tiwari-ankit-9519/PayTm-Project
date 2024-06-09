import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "./UI/Heading";
import Button from "./UI/Button";
import axios from "axios";
import Modal from "./UI/Modal";

export default function Signin() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUserData = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post(
        "http://localhost:4000/api/v1/users/login",
        loginUserData
      );
      setIsModalOpen(false);
    } catch (e) {
      setError(true);
      setErrorMessage(e.response.data.message);
      setIsModalOpen(true);
    }
  };

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
        <Heading label={`Sign${" "}In`} />
        <p className="mt-4 text-center">
          Enter your credentials to access your account
        </p>
        <form className="mt-8 flex flex-col">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            className="p-2 border border-gray-200 rounded-md mt-2"
            placeholder="Email"
          />

          <label htmlFor="email" className="font-semibold mt-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            className="p-2 border border-gray-200 rounded-md mt-2"
            placeholder="Password"
          />
          <Button label={`Sign${" "}In`} handleSubmit={handleSubmit} />
          <p className="mt-2 text-center">
            New to the Website?{" "}
            <Link to="/signup" className="text-blue-600 cursor-pointer">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
