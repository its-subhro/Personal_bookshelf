import { useState, useEffect } from "react";
import "./App.css";
import "./components/UserCartComponent.css";
import ShowCourseComponent from "./components/Showcoursecomponent";
import UserCartComponent from "./components/UserCartComponent";
import { db } from "./firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [cartCourses, setCartCourses] = useState(() => {
    const savedCartCourses = localStorage.getItem("cartCourses");
    return savedCartCourses ? JSON.parse(savedCartCourses) : [];
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "MenuItems"));
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);

  const addCourseToCartFunction = (GFGcourse) => {
    const alreadyCourses = cartCourses.find(
      (item) => item.key === GFGcourse.key
    );
    let updatedCart;
    if (alreadyCourses) {
      updatedCart = cartCourses.map((item) =>
        item.key === GFGcourse.key
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [...cartCourses, { ...GFGcourse, quantity: 1 }];
    }

    setCartCourses(updatedCart);
    localStorage.setItem("cartCourses", JSON.stringify(updatedCart));
  };

  const deleteCourseFromCartFunction = (GFGCourse) => {
    const updatedCart = cartCourses.filter(
      (item) => item.key !== GFGCourse.key
    );
    setCartCourses(updatedCart);
    localStorage.setItem("cartCourses", JSON.stringify(updatedCart));
  };

  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar
            cartCourses={cartCourses}
            query={query}
            handleSearchChange={handleSearchChange}
          />
          <ShowCourseComponent
            query={query}
            addCourseToCartFunction={addCourseToCartFunction}
          />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <UserCartComponent
          cartCourses={cartCourses}
          deleteCourseFromCartFunction={deleteCourseFromCartFunction}
          totalAmountCalculationFunction={totalAmountCalculationFunction}
          setCartCourses={setCartCourses}
          addCourseToCartFunction={addCourseToCartFunction}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
