"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/publicHeader";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Fetch public blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<Blog[]>(
          "http://localhost:3000/blogger/findAllPublicBlog"
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col">
      <Header />
      <div className="container mx-auto mt-20 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Public Blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    {blog.title}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {blog.content.slice(0, 100)}...
                  </p>
                  <p className="text-sm text-gray-500">By {blog.author.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs found.</p>
          )}
        </div>
      </div>
      <footer className="bg-customBlack text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Blog Application. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
