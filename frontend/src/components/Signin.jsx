import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "./UI/Heading";
import Button from "./UI/Button";

export default function Signin() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //   const [error, setError] = useState(false)

  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  return (
    <div className="flex items-center justify-center">
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
