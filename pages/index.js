/* eslint-disable react/no-unescaped-entities */
import PhotoCard from "@/components/PhotoCard";
import React from "react";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
    </div>
  );
}
