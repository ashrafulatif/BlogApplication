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

export default function RemoveUser({ params }: { params: { id: string } }) {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
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
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleConfirmation = async () => {
    try {
      await removeUser();
      // Redirect to admin page after successful removal
      router.push("/admin");
    } catch (e: any) {
      setError(e.message || "Failed to remove user.");
    }
  };

  const removeUser = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.delete(
        `http://localhost:3000/admin/remove-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error removing user:", error);
      throw new Error("Failed to remove user.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex mt-20">
        <AdminSidebar />
        <div className="flex justify-center w-full p-4">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mb-4">Remove User</h1>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">Name</label>
              <input
                type="text"
                value={user.name}
                readOnly
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Username
              </label>
              <input
                type="text"
                value={user.username}
                readOnly
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Email
              </label>
              <input
                type="text"
                value={user.email}
                readOnly
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={user.phonenumber}
                readOnly
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={handleConfirmation}
              >
                Remove User
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
