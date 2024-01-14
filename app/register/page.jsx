"use client";
import "@styles/Register.scss";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  });

  const { username, email, password, confirmPassword, profileImage } = formData;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    if (!username || !email || !password || !confirmPassword || !profileImage) {
      toast.error("Please fill all field");
    }
    e.preventDefault();
    var loadingToast = toast.loading("Authorizing....");

    if (!passwordMatch) {
      toast.error("Password is incorrect");
    }

    try {
      const registerForm = new FormData();

      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("/api/register/", {
        method: "POST",
        body: registerForm,
      });

      toast.remove(loadingToast);
      if (response.ok) {
        router.push("/login");
        toast.success("User registerred successfully!");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
      toast.error("Registration failed", err.message);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="register">
      <img
        src="/assets/register.jpg"
        alt="register image"
        className="register_decor"
      />
      <div className="register_content">
        <form
          action=""
          className="register_content_form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={handleChange}
          />
          {!passwordMatch && <p>Passwords are not matched</p>}
          <input
            type="file"
            id="image"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add Profile" />
            <p>Upload Profile Photo</p>
          </label>
          {profileImage && (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profil-image"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>
        </form>
        <button type="button" onClick={loginWithGoogle} className="google">
          <p>Log In with Google</p>
          <FcGoogle />
        </button>
        <Link href="/login">Already have an account? Logn In Here</Link>
      </div>
    </div>
  );
};

export default Register;
