"use client";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import BloggerHeader from "@/app/components/bloggerHeader";
import BloggerSidebar from "@/app/components/bloggerSideBar";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({ title: "", content: "" });

  const router = useRouter();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Validation function
  const validateFields = () => {
    const errors = { title: "", content: "" };
    if (!title) errors.title = "Title is required";
    else if (title.length < 5 || title.length > 100)
      errors.title = "Title must be between 5 and 100 characters";

    if (!content) errors.content = "Content is required";
    else if (content.length < 10 || content.length > 2000)
      errors.content = "Content must be between 10 and 2000 characters";

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (!Object.values(validationErrors).some((error) => !!error)) {
      try {
        await postData();
        Cookies.set(
          "successMessage",
          `New blog post "${title}" created successfully!`
        );
        setSuccessMessage("Blog post created successfully!");
        setTitle("");
        setContent("");
        router.push("/blogger");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Post data to the backend
  const postData = async () => {
    const token = Cookies.get("jwtToken");
    const data = { title, content };

    try {
      await axios.post(`http://localhost:3000/blogger/create-blog`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BloggerHeader />
      <div className="flex flex-1 pt-16">
        <BloggerSidebar />
        <div className="flex-1 flex justify-center items-start p-4 mt-20">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold mt-0 mb-3">
              Add Blog Post
            </h1>
            {successMessage && (
              <p className="text-green-500 text-xs italic">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleChangeTitle}
                  className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none ${
                    errors.title && "border-red-500"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs italic">{errors.title}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={handleChangeContent}
                  className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none ${
                    errors.content && "border-red-500"
                  }`}
                  rows={5}
                />
                {errors.content && (
                  <p className="text-red-500 text-xs italic">
                    {errors.content}
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Blog
                </button>
                <button
                  type="reset"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
