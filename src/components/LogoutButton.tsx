import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      toast.success("Logout successful!");
      router.push("/login");
    } else {
      toast.error("Failed to logout");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
