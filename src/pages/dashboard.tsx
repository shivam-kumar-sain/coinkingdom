import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import PreLoader from "../../src/components/comman/PreLoader"; // Import the pre-loader


const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<{ id?: string; username?: string; email?: string }>({});
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setUserInfo(data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return <PreLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>User Info:</p>
      <ul>
        <li><strong>ID:</strong> {userInfo.id}</li>
        <li><strong>Username:</strong> {userInfo.username}</li>
        <li><strong>Email:</strong> {userInfo.email}</li>
      </ul>
    </div>
  );
};

export default Dashboard;
