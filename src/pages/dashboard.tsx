import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/login"); // Redirect to login if no token is found
    } else {
      setIsAuthenticated(true); // Token is present, show dashboard content
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Show loading while checking token
  }

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
    </div>
  );
}
