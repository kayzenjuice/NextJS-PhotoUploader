import Link from "next/link";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto mt-24">
        <div className="text-center max-w-md mx-auto">
          <h2 className="mb-4 text-6xl md:text-7xl text-center font-bold font-heading tracking-px-n leading-tight">
            Forgot your password?
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            Enter your email address below to reset your password.
          </p>
          <form>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signInInput2-1"
                type="text"
                placeholder="Email address"
              />
            </label>

            <button
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
              type="button"
            >
              Send me an email
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
