/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/app/components/publicHeader";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for controlling password visibility

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setPhonenumber(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Form data:", {
      name,
      username,
      email,
      phonenumber,
      password,
    });

    setError("");

    if (!name || !username || !email || !phonenumber || !password) {
      setError("All fields are required");
      return;
    }

    // Validate email format
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError("Invalid email address.");
      return;
    }

    // Validate phone number format
    if (!phonenumber.match(/^\d{10}$/)) {
      setError("Phone number must be a valid 10-digit number.");
      return;
    }

    // Perform additional validations...

    try {
      const response = await postData();
      console.log("User registered successfully:", response);
      setError("User registered successfully");
      // Reset form fields
      setName("");
      setUsername("");
      setEmail("");
      setPhonenumber("");
      setPassword("");
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Username/Email Already Exists");
    }
  };

  async function postData() {
    try {
      const userData = {
        name,
        username,
        email,
        phonenumber,
        password,
      };

      const response = await axios.post(
        "http://localhost:3000/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      throw new Error("Error registering user");
    }
  }

  return (
    <>
      <Header />
      <div className="min-w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
        <div className="bg-white rounded-lg p-10 w-96">
          <h1 className="text-4xl font-extrabold text-center mb-6">Signup</h1>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleChangeName}
                className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleChangeUsername}
                className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phonenumber}
                onChange={handleChangePhoneNumber}
                className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
                className="bg-customGray rounded w-full py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                  className="mr-2"
                />
                <label className="text-sm">Show Password</label>
              </div>
              <button
                type="submit"
                className="bg-customTeal text-white rounded-lg font-semibold w-full py-2 hover:bg-indigo-500"
              >
                Signup
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Already have an account?
            <Link href="/login" className="ml-2 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
