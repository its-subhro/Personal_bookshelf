import React, { useState, useEffect } from "react";

function ShowCourseComponent({ addCourseToCartFunction, query }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (query.length === 0) {
      setCourses([]);
      return;
    }

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
        );
        const data = await response.json();
        setCourses(data.docs);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [query]);

  return (
    <div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : courses.length === 0 && query.length > 0 ? (
        <p className="no-results">No Items To Show.</p>
      ) : (
        <div className="bg-black">
          <div className="max-w-2xl px-7 sm:px-6 lg:max-w-7xl mx-auto">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {courses.map((course) => (
                <div
                  key={course.key}
                  className="group relative transform hover:scale-110 transition-transform duration-300 ease-in-out"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={`https://covers.openlibrary.org/b/id/${course.cover_i}-L.jpg`}
                      alt={course.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h2 className="text-base text-white font-bold">
                        {course.title}
                      </h2>
                      <p className="text-sm text-gray-400">
                      
                        {`Edition Count:${course.edition_count}`}
                      </p>
                    </div>
                    <p className="text-base font-medium text-white">
                      {course.first_publish_year}
                    </p>
                  </div>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addCourseToCartFunction(course)}
                  >
                    Add to Shopping Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="my-10"></div>
    </div>
  );
}

export default ShowCourseComponent;
