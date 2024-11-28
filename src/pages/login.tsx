import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token } = await res.json(); // Assuming the token is returned in the response body
      // Store token securely in cookies (HttpOnly flag for better security)
      Cookies.set("authToken", token, { expires: 7 }); // The token expires after 7 days
      router.push("/dashboard"); // Redirect to dashboard after login
    } else {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
