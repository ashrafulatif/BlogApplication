"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminHeader = () => {
  const router = useRouter();
  const username = Cookies.get("username");

  const handleLogout = () => {
    try {
      Cookies.remove("jwtToken");
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Optionally display an error message
    }
  };

  return (
    <header className="fixed w-full bg-customBlack py-5 top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1>
          <Link href="/" className="text-white text-2xl font-extrabold">
            Blog Application
          </Link>
        </h1>
        <nav className="text-end">
          <ul className="flex items-center space-x-4">
            <li className="text-white">Welcome {username} |</li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 focus:outline-none"
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
