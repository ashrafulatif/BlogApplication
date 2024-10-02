import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full bg-customBlack py-4 top-0 left-0">
      <div className="container mx-auto flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <h1>
          <Link href="/" className="text-white">
            Blog Application
          </Link>
        </h1>
        <nav className="text-end">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-white hover:text-gray-300">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
