import React, { useState, useEffect } from "react";
import "../styles/onebox.css"; // Import CSS for layout styling

import Sidebar from "./oneboxComponents/Sidebar";
import Navbar from "./oneboxComponents/Navbar";
import Main from "./oneboxComponents/Main";
import Main2 from "./oneboxComponents/Main2"; // Import Main2 component

const Onebox = () => {

  const [currentPage, setCurrentPage] = useState("Main"); // Initial page is Main
  const [mailIconBackground, setMailIconBackground] = useState("none"); // Initial background color for MailIcon
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track dark mode
  
  const [token, setToken] = useState('');
  useEffect(() => {
    // Function to handle storing dark mode preference in local storage
    const handleDarkModePreference = () => {
      const storedDarkMode = localStorage.getItem("isDarkMode");
      if (storedDarkMode !== null) {
        setIsDarkMode(JSON.parse(storedDarkMode));
      }
    };

    // Call the function to load dark mode preference from local storage
    handleDarkModePreference();
  }, []);

  // Function to toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
  };
  useEffect(() => {
    // Function to handle storing token in session storage
    const handleStoreToken = () => {
      try {
        // Extract token from URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromURL = urlParams.get("token");
        if (tokenFromURL) {
          // Set token in session storage
          sessionStorage.setItem("tempToken", tokenFromURL);
          setToken(tokenFromURL);
        }
      } catch (error) {
        console.error("Error storing token in session storage:", error);
      }
    };

    // Call the function to store token in session storage
    handleStoreToken();
  }, []); // Empty dependency array to run only once after initial render

  const togglePage = () => {
    setCurrentPage(currentPage === "Main" ? "Main2" : "Main");
    setMailIconBackground(currentPage === "Main" ? "#2f3030" : "#101113");
  };

  return (
    <div className="onebox">
      {/* Render Sidebar and Navbar, passing togglePage function, currentPage state, and mailIconBackground state */}
      <Sidebar
        togglePage={togglePage}
        currentPage={currentPage}
        mailIconBackground={mailIconBackground} isDarkMode={isDarkMode}
      />
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
      {/* Render Main or Main2 component based on currentPage state */}
      {currentPage === "Main" ? <Main /> : <Main2 token={token} isDarkMode={isDarkMode} />}
    </div>
  );
};

export default Onebox;
