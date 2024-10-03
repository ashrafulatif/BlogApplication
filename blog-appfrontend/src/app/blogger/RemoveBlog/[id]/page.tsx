/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import BloggerHeader from "@/app/components/bloggerHeader";
import BloggerSidebar from "@/app/components/bloggerSideBar";

interface Blog {
  id: number;
  title: string;
  content: string;
}

export default function RemoveBlog({ params }: { params: { id: string } }) {
  const { id } = params;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const response = await axios.get<Blog>(
          `http://localhost:3000/blogger/findBlogByID/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError("Failed to fetch blog details.");
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleConfirmation = async () => {
    try {
      await removeBlog();
      // Redirect to the admin page after successful removal
      router.push("/blogger");
    } catch (e: any) {
      setError(e.message || "Failed to remove blog.");
    }
  };

  const removeBlog = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.delete(
        `http://localhost:3000/blogger/remove-blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error removing blog:", error);
      throw new Error("Failed to remove blog.");
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <BloggerHeader />
      <div className="flex flex-1 pt-16">
        <BloggerSidebar />
        <div className="flex-1 flex justify-center items-start p-4 mt-20">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mt-0 mb-3">
              Remove Blog
            </h1>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Title
              </label>
              <input
                type="text"
                value={blog.title}
                readOnly
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Content
              </label>
              <textarea
                value={blog.content}
                readOnly
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={4}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={handleConfirmation}
              >
                Remove Blog
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
