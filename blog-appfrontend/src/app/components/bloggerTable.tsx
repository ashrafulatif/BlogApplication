"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Author {
  id: number;
  name: string;
  username: string;
  email: string;
  phonenumber: string;
  role: string;
  isActive: boolean;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
}

export default function BloggerTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Define the router here

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = Cookies.get("jwtToken");
      console.log("Fetched token:", token);

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/blogger/findAllBlog",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response data:", response.data); // Log the response to check if data is coming
        setBlogs(response.data); // Set the blogs if data is fetched successfully
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs. Please check your authentication.");
      }
    };

    fetchBlogs();
  }, []);

  const handleUpdate = (id: number) => {
    router.push(`/blogger/UpdateBlog/${id}`);
  };

  const handleRemove = (id: number) => {
    router.push(`/blogger/RemoveBlog/${id}`);
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full">
        <h1 className="text-2xl text-left mb-2">All Blogs:</h1>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <table className="min-w-full bg-white rounded-lg overflow-hidden text-xs">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Content</th>
                <th className="px-4 py-2">Create Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {blogs.map((blog, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{blog.title}</td>
                  <td className="px-4 py-2">{blog.author.name}</td>
                  <td className="px-4 py-2">{blog.content}</td>
                  <td className="px-4 py-2">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString() // Format the date
                      : "Invalid Date"}
                  </td>
                  <td className="px-4 py-2 flex justify-between">
                    <button
                      type="button"
                      className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                      onClick={() => handleUpdate(blog.id)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                      onClick={() => handleRemove(blog.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
