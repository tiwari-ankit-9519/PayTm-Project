import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Heading from "./UI/Heading";
import Button from "./UI/Button";

export default function Signup() {
  const fullNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      fullName: fullNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: emailRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  console.log(formData);

  return (
    <div className="flex items-center justify-center">
      <div className="mt-16 bg-white w-1/4 border rounded-lg p-5 shadow-2xl">
        <Heading label={`Sign${" "}Up`} />
        <p className="mt-4 text-center">
          Enter your information to create an account
        </p>

        <form className="mt-8 flex flex-col">
          <label htmlFor="fullName" className="font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            ref={fullNameRef}
            className="p-2 border border-gray-200 rounded-md mt-2"
            placeholder="Full Name"
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
