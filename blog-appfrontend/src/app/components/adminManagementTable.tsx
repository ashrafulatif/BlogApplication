"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Blogger {
  id: number;
  name: string;
  username: string;
  email: string;
  phonenumber: string;
  isActive: boolean;
}

export default function AdminManagementTable() {
  const [bloggers, setBloggers] = useState<Blogger[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBloggers = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const response = await axios.get("http://localhost:3000/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBloggers(response.data);
      } catch (error) {
        console.error("Error fetching bloggers:", error);
      }
    };

    fetchBloggers();
  }, []);

  const handleUpdate = (id: number) => {
    router.push(`/admin/UpdateUser/${id}`);
  };

  const handleRemove = (id: number) => {
    router.push(`/admin/RemoveUser/${id}`);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-100%">
        <h1 className="text-2xl text-left mb-2">All Bloggers:</h1>
        <table className="min-w-full bg-white rounded-lg overflow-hidden text-xs">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bloggers.map((blogger, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{blogger.name}</td>
                <td className="px-4 py-2">{blogger.username}</td>
                <td className="px-4 py-2">{blogger.email}</td>
                <td className="px-4 py-2">{blogger.phonenumber}</td>
                <td className="px-4 py-2">
                  {blogger.isActive ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-2 flex justify-between">
                  <button
                    type="button"
                    className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                    onClick={() => handleUpdate(blogger.id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                    onClick={() => handleRemove(blogger.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
