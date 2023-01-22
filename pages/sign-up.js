/* eslint-disable react/no-unescaped-entities */
import { auth } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    console.log("CLICKED");

    if (password === confirmPassword) {
      const currentUser = await signUp(email, password);

      if (currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
    } else {
      toast.error("Your passwords do not match!");
    }
  }

  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <a className="mb-36 inline-block" href="#">
            <img src="flaro-assets/logos/flaro-logo-black-xl.svg" alt="" />
          </a>
          <h2 className="mb-4 text-6xl md:text-7xl text-center font-bold font-heading tracking-px-n leading-tight">
            Join for free
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            Don't have an account? sign up with us today!
          </p>
          <form onSubmit={onSubmit}>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="name"
                type="text"
                value={name}
                onChange={onChange}
                placeholder="First &amp; Last Name"
              />
            </label>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="email"
                type="email"
                onChange={onChange}
                placeholder="Email Address"
              />
            </label>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="password"
                type="password"
                value={password}
                onChange={onChange}
                placeholder="Create Password"
              />
            </label>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Create Password"
              />
            </label>
            <button
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
              type="submit"
            >
              Create Account
            </button>
            <p className="font-medium">
              <span>Already have an account?</span>
              <Link href="/sign-in">
                <button className="text-indigo-600 hover:text-indigo-700">
                  {" "}
                  Login
                </button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
