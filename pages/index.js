/* eslint-disable react/no-unescaped-entities */
import PhotoCard from "@/components/PhotoCard";
import React, { useEffect, useState } from "react";
import getPhotos, { getMorePhotos } from "@/utils/photos";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

export default function HomePage() {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedPhoto, setLastFetchedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const allPhotos = await getPhotos(setLastFetchedPhoto, setLoading, 3);
      setPhotos(allPhotos);
    };
    fetchPhotos();
  }, []);

  async function fetchMore() {
    const allPhotos = await getMorePhotos(
      setLastFetchedPhoto,
      setLoading,
      lastFetchedPhoto,
      1
    );

    if (!allPhotos) {
      toast.error("No more photos");
      return;
    }
    setPhotos((prevState) => [...prevState, ...allPhotos]);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-10">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
      <div className="animate-in slide-in-from-bottom duration-1000 bottom-0 flex justify-center mb-10 w-full">
        <Button btnStyle={"p-3"} text={"Show more"} onClick={fetchMore} />
      </div>
    </>
  );
}
