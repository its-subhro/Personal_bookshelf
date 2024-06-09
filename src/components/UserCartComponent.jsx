import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function UserCartComponent({
  cartCourses,
  setCartCourses,
  deleteCourseFromCartFunction,
}) {
  // Function to update cartCourses and localStorage
  const updateCart = (updatedCart) => {
    setCartCourses(updatedCart);
    localStorage.setItem("cartCourses", JSON.stringify(updatedCart));
  };

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cartCourses");
    if (storedCart) {
      setCartCourses(JSON.parse(storedCart));
    }
  }, [setCartCourses]);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          &larr; Back
        </Link>
        <h2 className="text-2xl font-bold ml-4 text-center sm:text-left text-white">
          My Bookshelf
        </h2>
      </div>
      {cartCourses.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartCourses.map((item) => (
              <li
                key={item.key}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between"
              >
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="w-24 h-24 sm:w-16 sm:h-16 flex-shrink-0">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-500">
                      Edition: {item.edition_count || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteCourseFromCartFunction(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserCartComponent;
