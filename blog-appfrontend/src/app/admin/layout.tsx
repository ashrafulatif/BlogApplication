import AdminSidebar from "../components/adminSideBar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow">
        {" "}
        {/* Main content area */}
        {/* Other components or content */}
      </div>
    </div>
  );
};

export default AdminLayout;
