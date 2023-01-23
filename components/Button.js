import React from "react";

export default function Button({ btnStyle, onClick, type, text }) {
  return (
    <button
      className={`${btnStyle} text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
