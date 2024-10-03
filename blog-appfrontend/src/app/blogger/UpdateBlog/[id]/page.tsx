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

export default function UpdateBlog({ params }: { params: { id: string } }) {
  const { id } = params;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (blog) {
      setBlog({ ...blog, [name]: value });
    }
  };

  const validateInputs = () => {
    if (!blog) return false;
    if (!blog.title || !blog.content) {
      setError("All fields are required.");
      return false;
    }
    if (blog.title.length < 5 || blog.title.length > 100) {
      setError("Title must be between 5 and 100 characters.");
      return false;
    }
    if (blog.content.length < 10 || blog.content.length > 2000) {
      setError("Content must be between 10 and 2000 characters.");
      return false;
    }
    setError(""); // Clear any previous error messages
    return true;
  };

  const handleUpdate = async () => {
    if (!validateInputs()) return; // Only proceed if inputs are valid

    try {
      const token = Cookies.get("jwtToken");
      await axios.patch(
        `http://localhost:3000/blogger/update-blog/${id}`,
        blog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Redirect to admin page after successful update
      router.push("/blogger");
    } catch (e: any) {
      setError(e.message || "Failed to update blog.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <BloggerHeader />
      <div className="flex flex-1 pt-16">
        <BloggerSidebar />
        <div className="flex-1 flex justify-center items-start p-4 mt-20">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mt-0 mb-3">
              Update Blog
            </h1>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-bold mb-1">
                Content
              </label>
              <textarea
                name="content"
                value={blog.content}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={5}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="bg-customTeal hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={handleUpdate}
              >
                Update Blog
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
