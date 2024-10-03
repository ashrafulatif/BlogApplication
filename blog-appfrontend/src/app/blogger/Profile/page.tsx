/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import BloggerHeader from "@/app/components/bloggerHeader";
import BloggerSidebar from "@/app/components/bloggerSideBar";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phonenumber: string;
  isActive: boolean;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const username = Cookies.get("username");
        const token = Cookies.get("jwtToken");

        if (!username) {
          setError("No username found in cookies.");
          setLoading(false);
          return;
        }

        const response = await axios.get<User>(
          `http://localhost:3000/user/by-name/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <BloggerHeader />
      <div className="flex flex-1 pt-16">
        <BloggerSidebar />
        <div className="flex-1 flex justify-center items-start p-4 mt-20">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mt-0 mb-3">
              User Profile
            </h1>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">Name</label>
              <p className="border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {user.name}
              </p>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Username
              </label>
              <p className="border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {user.username}
              </p>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Email
              </label>
              <p className="border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {user.email}
              </p>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Phone Number
              </label>
              <p className="border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                {user.phonenumber}
              </p>
            </div>
            <div className="text-center">
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
