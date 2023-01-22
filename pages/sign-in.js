import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";

export default function SignInPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    await login(email, password);
  }
  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto mt-24">
        <div className="text-center max-w-md mx-auto">
          <h2 className="mb-4 text-6xl md:text-7xl text-center font-bold font-heading tracking-px-n leading-tight">
            Welcome Back
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            Please sign in with your email address and password
          </p>
          <form onSubmit={onSubmit}>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="email"
                type="email"
                value={email}
                onChange={onChange}
                placeholder="Email address"
              />
            </label>
            <label className="relative block mb-5">
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                className="px-4 pr-36 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="password"
                type="password"
                onChange={onChange}
                value={password}
                placeholder="Password"
              />
            </label>
            <button
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
              type="submit"
            >
              Sign In
            </button>
            <p className="font-medium">
              <span>Don’t have an account?</span>
              <Link
                href="/sign-up"
                className="text-indigo-600 hover:text-indigo-700"
              >
                {" "}
                Create free account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
