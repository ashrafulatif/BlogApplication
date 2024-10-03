"use client";
import React from "react";
import Link from "next/link";

const BloggerSidebar = () => {
  return (
    <div className="w-1/6 bg-gray-900 text-white p-4">
      <h2 className="text-lg font-bold mb-5">Blogger Sidebar</h2>
      <ul>
        <li className="mb-3">
          <Link href="/blogger/Profile" className="hover:text-gray-300 ">
            Profile
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/blogger" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/" className="hover:text-gray-300">
            Public Blogs
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/blogger/AddBlog" className="hover:text-gray-300">
            Add Blog
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BloggerSidebar;
