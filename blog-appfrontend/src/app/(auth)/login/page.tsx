/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/app/components/publicHeader";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await postData();
      console.log("User logged in successfully:", response);

      // Store the JWT token in cookies
      if (response.accessToken) {
        Cookies.set("jwtToken", response.accessToken, { expires: 1 });
      } else {
        console.error("Token is missing in the response");
        setError("Login failed, no token received.");
        return;
      }
      Cookies.set("username", response.username);

      // Redirect based on user role
      if (response.role === "admin") {
        router.push("/admin"); // Admin panel
      } else if (response.role === "blogger") {
        router.push("/blogger"); // Blogger page
      } else {
        setError("Unknown user role");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid username or password");
    }
  };

  async function postData() {
    try {
      const userData = {
        username,
        password,
      };

      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      throw new Error("Error logging in");
    }
  }

  return (
    <>
      <Header />
      <div className="min-w-screen min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
        <div className="bg-white rounded-lg p-10 w-96">
          <h1 className="text-4xl font-extrabold text-center mb-6">Login</h1>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleChangeUsername}
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
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Don&apos;t have an account?
            <Link href="/signup" className="ml-2 hover:text-indigo-500">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
