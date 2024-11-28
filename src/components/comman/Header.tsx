import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Header.module.css";

// Helper function to check if the user is logged in (e.g., check cookie or localStorage)
const checkLoginStatus = () => {
  // Check for token in cookies or localStorage
  return !!localStorage.getItem("authToken"); // Assuming the auth token is stored in localStorage
};

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On component mount, check the login status
  useEffect(() => {
    setIsLoggedIn(checkLoginStatus());
  }, []);

  const handleLogout = () => {
    // Clear the auth token from localStorage or cookies
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Update state to reflect logout
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <header className={styles.header}>
      <h1>My App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {!isLoggedIn ? (
            <li>
              <Link href="/login">Login</Link>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
