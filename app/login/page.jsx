"use client";

import "@styles/Login.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var loadingToast = toast.loading("Authorizing....");

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      toast.remove(loadingToast);
      if (response.ok) {
        router.push("/");
        toast.success("User Login successfully!");
      }

      if (response.error) {
        setError("Invalid email or password. Please try again!");
        toast.error("Invalid email or password. Please try again!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed", err);
      toast.remove(loadingToast);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="login">
      <img src="/assets/login.jpg" alt="login" className="login_decor" />
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Log In</button>
        </form>
        <button className="google" onClick={loginWithGoogle}>
          <p>Log In with Google</p>
          <FcGoogle />
        </button>
        <Link href="/register">Don't have an account? Sign In Here</Link>
      </div>
    </div>
  );
};

export default Login;
