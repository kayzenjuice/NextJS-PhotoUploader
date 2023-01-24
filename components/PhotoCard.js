/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PhotoCard({ photo }) {
  return (
    <div className="flex justify-center">
      <Link href={`/photos/${photo?.id}`}>
        <div className="animate-in slide-in-from-left duration-1000 rounded-lg shadow-lg bg-white max-w-sm  ">
          <Image
            className="rounded-t-lg h-[350px] object-cover"
            src={photo?.data.img[0]}
            alt=""
            width={450}
            height={350}
          />

          <div className="p-6 flex flex-col justify-center text-center">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {photo?.data.photoName}
            </h5>
            <p className="text-gray-700 text-base mb-4">
              {photo?.data.description}
            </p>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              VIEW MORE
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
