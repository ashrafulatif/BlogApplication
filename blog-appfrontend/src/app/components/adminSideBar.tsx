"use client";
import React from "react";
import Link from "next/link";

const AdminSidebar = () => {
  return (
    <div className="w-1/6 bg-gray-900 text-white p-5">
      <h2 className="text-lg font-bold mb-5">Admin Dashboard</h2>
      <ul>
        <li className="mb-3">
          <Link href="/admin/Profile" className="hover:text-gray-300">
            Profile
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/admin" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
