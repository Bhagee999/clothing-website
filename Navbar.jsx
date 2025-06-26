import React, { useContext, useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import SearchBar from "./SearchBar";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  const accountRef = useRef(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleToggle = () => setIsOpen(!isOpen);

  // Close account dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black border-t-2 border-white shadow-md px-4 md:px-8 py-4">
      {/* Top Nav Section */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-clothing-store-logo-design_23-2149577871.jpg?semt=ais_hybrid&w=740"
              alt="Logo"
              className="h-20 w-20 rounded-full"
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10 relative right-290 text-2xl">
          {/* Categories */}
          <div className="flex absolute left-50 gap-6">
            <Link
              to="/Men"
              className="flex flex-col items-center text-xs font-bold text-white hover:text-blue-400"
            >
              <img
                src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/77106652-5e5b-4063-ab1c-312a04246222/82d8c885-ab64-4dcb-8019-94ba100ce366.png"
                alt="Men"
                className="w-15 h-15 rounded-full"
              />
              MEN
            </Link>
            <Link
              to="/Women"
              className="flex flex-col items-center text-xs font-bold text-white hover:text-pink-500"
            >
              <img
                src="https://t4.ftcdn.net/jpg/09/70/21/89/360_F_970218910_wEnTpwRkU76E5aCejiDN94fK0OMrdqpk.jpg"
                alt="Women"
                className="w-15 h-15 rounded-full"
              />
              WOMEN
            </Link>
            <Link
              to="/Kids"
              className="flex flex-col items-center text-xs font-bold text-white hover:text-green-500"
            >
              <img
                src="https://img.freepik.com/premium-vector/vector-cartoon-style-icon-illustration-two-cute-kids-boy-girl-waving-hands_134830-2202.jpg"
                alt="Kids"
                className="w-15 h-15 rounded-full"
              />
              KIDS
            </Link>
            <Link
              to="/TraditionalWear"
              className="flex flex-col items-center text-xs font-bold text-white hover:text-yellow-500"
            >
              <img
                src="https://cdn.vectorstock.com/i/1000v/01/76/couple-kids-cartoon-wearing-costume-india-vector-51650176.jpg"
                alt="Traditional"
                className="w-15 h-15 rounded-full"
              />
              TRADITIONAL
            </Link>
          </div>

          {/* Search */}
          <div className="ml-6 hidden lg:block relative left-270">
            <SearchBar />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-white font-semibold text-2xl relative left-290">
            <Link to="/" className="hover:text-yellow-400">
              Home
            </Link>

            {/* Account Icon and dropdown */}
            <div
              className="relative cursor-pointer"
              ref={accountRef}
              onClick={() => setAccountOpen(!accountOpen)}
            >
              <FaUserCircle className="text-2xl hover:text-yellow-400" />
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-2 bg-black border border-yellow-400 rounded-md shadow-lg z-50">
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black"
                    onClick={() => setAccountOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black"
                    onClick={() => setAccountOpen(false)}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="hover:text-yellow-400 relative flex items-center"
            >
              <FaShoppingCart className="mr-1" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-10 h-10 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-white text-2xl" onClick={handleToggle}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-white text-sm">
          <Link to="/Men" className="hover:text-blue-400" onClick={handleToggle}>
            Men
          </Link>
          <Link
            to="/Women"
            className="hover:text-pink-400"
            onClick={handleToggle}
          >
            Women
          </Link>
          <Link to="/Kids" className="hover:text-green-400" onClick={handleToggle}>
            Kids
          </Link>
          <Link
            to="/TraditionalWear"
            className="hover:text-yellow-400"
            onClick={handleToggle}
          >
            Traditional
          </Link>
          <Link
            to="/"
            className="hover:text-yellow-400"
            onClick={handleToggle}
          >
            Home
          </Link>

          {/* Mobile Account Dropdown */}
          <div className="relative" ref={accountRef}>
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 "
              onClick={() => setAccountOpen(!accountOpen)}
            >
              <FaUserCircle className="text-xl" />
              Account
            </div>
            {accountOpen && (
              <div className="flex flex-col mt-2 ml-6 gap-2">
                <Link
                  to="/login"
                  className="hover:text-yellow-400"
                  onClick={() => {
                    setAccountOpen(false);
                    setIsOpen(false);
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hover:text-yellow-400"
                  onClick={() => {
                    setAccountOpen(false);
                    setIsOpen(false);
                  }}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          <Link to="/cart" className="hover:text-yellow-400 flex items-center" onClick={handleToggle}>
            <FaShoppingCart className="mr-1" />
            Cart
            {totalItems > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
