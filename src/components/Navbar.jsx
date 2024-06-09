import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({ cartCourses, query, handleSearchChange }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center w-full mr-4">
          <input
            type="text"
            placeholder="Search by bookname.."
            value={query}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <Link to="/cart">
            <button className="relative bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m4 8l1.2 6.4a1 1 0 001 .6h6.8a1 1 0 001-.6L17 13M5 21h14a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2z"
                ></path>
              </svg>
              {cartCourses.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartCourses.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
