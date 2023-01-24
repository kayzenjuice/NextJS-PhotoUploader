/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/firebase";

export default function NavBar() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const [showPanel, setShowPanel] = useState(false);

  return (
    <section className="overflow-hidden">
      <div className="flex items-center justify-between px-7 xl:px-40 py-5 bg-white">
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-auto mr-14">
              <img
                src="assets/Logonew.png"
                className="animate-in slide-in-from-top duration-500 cursor-pointer w-48"
                onClick={() => router.push("/")}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-auto hidden lg:block">
              <ul className="flex items-center mr-16">
                <li className="mr-9 font-medium hover:text-gray-700">
                  <Link href="/upload">Upload</Link>
                </li>
              </ul>
            </div>
            <div className="w-auto hidden lg:block">
              <div className="inline-block">
                {user ? (
                  <button
                    className="py-3 px-5 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                    type="button"
                    onClick={logout}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link href="/sign-in">
                    <button
                      className="py-3 px-5 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                      type="button"
                    >
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="w-auto lg:hidden">
              <a
                href="#"
                onClick={() => setShowPanel((prevState) => !prevState)}
              >
                <svg
                  className="navbar-burger text-indigo-600"
                  width="60"
                  height="60"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="56"
                    height="56"
                    rx="28"
                    fill="currentColor"
                  ></rect>
                  <path
                    d="M37 32H19M37 24H19"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          showPanel ? "visible" : "hidden"
        } navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50`}
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"></div>
        <nav className="relative z-10 px-9 pt-8 bg-white h-full overflow-y-auto">
          <div className="flex flex-wrap justify-between h-full">
            <div className="w-full">
              <div className="flex items-center justify-between -m-2">
                <div className="w-auto p-2">
                  <a className="inline-block" href="#">
                    <img
                      src="assets/Logonew.png"
                      onClick={() => router.push("/")}
                      className="cursor-pointer"
                      alt=""
                    />
                  </a>
                </div>
                <div className="w-auto p-2">
                  <a
                    className="navbar-burger"
                    href="#"
                    onClick={() => setShowPanel((prevState) => !prevState)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18L18 6M6 6L18 18"
                        stroke="#111827"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-center py-16 w-full">
                <ul>
                  <li className="mb-12">
                    <Link href="/upload">Upload</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-end w-full pb-8">
              <div className="flex flex-wrap">
                <div className="w-full">
                  <div className="block">
                    <button
                      className="py-3 px-5 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                      type="button"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
