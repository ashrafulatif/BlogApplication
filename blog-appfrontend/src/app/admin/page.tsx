"use client";
import React from "react";
import AdminManagementTable from "../components/adminManagementTable";
import AdminHeader from "../components/adminHeader";
import AdminSidebar from "../components/adminSideBar";

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader />
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <AdminManagementTable />
        </div>
      </div>
    </>
  );
}
