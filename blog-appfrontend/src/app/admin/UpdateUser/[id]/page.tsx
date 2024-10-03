/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminHeader from "@/app/components/adminHeader";
import AdminSidebar from "@/app/components/adminSideBar";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phonenumber: string;
  isActive: boolean;
}

export default function UpdateUser({ params }: { params: { id: string } }) {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const response = await axios.get<User>(
          `http://localhost:3000/admin/user/${id}`,
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
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      setUser({ ...user, [name]: value });
    }
  };

  const validateInputs = () => {
    if (!user) return false;
    if (!user.name || !user.username || !user.email || !user.phonenumber) {
      setError("All fields are required.");
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!/^\d{10}$/.test(user.phonenumber)) {
      setError("Phone number must be 10 digits.");
      return false;
    }
    setError(""); // Clear any previous error messages
    return true;
  };

  const handleUpdate = async () => {
    if (!validateInputs()) return; // Only proceed if inputs are valid

    try {
      const token = Cookies.get("jwtToken");
      await axios.patch(`http://localhost:3000/admin/update-user/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Redirect to admin page after successful update
      router.push("/admin");
    } catch (e: any) {
      setError(e.message || "Failed to update user.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex flex-1 pt-16">
        <AdminSidebar />
        <div className="flex-1 flex justify-center items-start p-4 mt-20">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mt-0 mb-3">
              Update User
            </h1>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phonenumber"
                value={user.phonenumber}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="bg-customTeal hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={handleUpdate}
              >
                Update User
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
