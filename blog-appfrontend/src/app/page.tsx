"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/publicHeader";

// Define the Blog type
interface Blog {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Set state with Blog type

  // Fetch public blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<Blog[]>(
          "http://localhost:3000/blogger/findAllPublicBlog"
        );
        setBlogs(response.data); // Set the fetched blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 px-4">
        {""}
        <h1 className="text-4xl font-bold mb-6">Public Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="border p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.content}</p>
                <p className="text-sm text-gray-500">By {blog.author.name}</p>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
