"use client";
import React from "react";
import BloggerTable from "../components/bloggerTable";
import BloggerHeader from "../components/bloggerHeader";
import { useRouter } from "next/navigation";
import BloggerSidebar from "../components/bloggerSideBar";

export default function BloggerDashboard() {
  const router = useRouter();

  const handleAddBlog = () => {
    router.push("/blogger/AddBlog");
  };

  return (
    <>
      <BloggerHeader />
      <div className="flex h-screen bg-gray-100  pt-16">
        <BloggerSidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Blogger Dashboard</h1>
          <button
            onClick={handleAddBlog}
            className="bg-customTeal hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add Blog
          </button>
          <BloggerTable />
        </div>
      </div>
    </>
  );
}
