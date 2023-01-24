/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { getAllPhotos, getPhoto } from "@/utils/photos";
import React, { useState } from "react";

export async function getStaticPaths() {
  const photos = await getAllPhotos();

  return {
    paths: photos.map((photoObj) => ({
      params: { photo: photoObj.id.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { photo } }) {
  try {
    let photoData = await getPhoto(photo);
    if (!photoData) {
      photoData = null;
    }
    return {
      props: { photoData },
      revalidate: 30,
    };
  } catch (err) {
    throw err;
  }
}

/*NEED TO GET PHOTO*/

export default function photoPage({ photoData }) {
  const router = useRouter();
  const [photo, setPhoto] = useState(JSON.parse(photoData));

  if (!photoData) {
    router.push({ pathname: "/_error" });
    return;
  }
  return (
    <>
      <div className="p-24 ">
        <section class="animate-in slide-in-from-left duration-1000 pt-12 pb-24   overflow-hidden">
          <div class="container px-4 mx-auto">
            <div class="flex flex-wrap -mx-4">
              <div class="w-full lg:w-1/2 px-4 xl:pr-20">
                <div class="lg:max-w-lg mb-6">
                  <h2 class="mt-6 mb-4 text-5xl md:text-7xl lg:text-9xl text-black font-heading font-semibold">
                    {photo.photoName}
                  </h2>

                  <p class="text-lg text-black">{photo.description}</p>
                </div>
              </div>
              <div class="w-full lg:w-1/2 px-4 xl:pl-20 mb-16 lg:mb-0 order-first lg:order-last">
                <div class="relative md:w-2/3 lg:w-auto mx-auto mb-14">
                  <img class="px-4 md:px-0 w-full" src={photo.img[0]} alt="" />

                  <button class="absolute top-1/2 right-0 -mr-1 md:-mr-10 text-white">
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.289849 1.54064C-0.0966146 1.18719 -0.0966145 0.615928 0.28985 0.265087C0.676314 -0.087058 1.30071 -0.0896662 1.68718 0.265087L7.21015 5.36206C7.59662 5.71421 7.59662 6.28416 7.21015 6.63892L1.68718 11.7359C1.30215 12.088 0.676312 12.088 0.289848 11.7359C-0.0966159 11.3824 -0.0966159 10.8112 0.289848 10.4603L4.81927 5.99853L0.289849 1.54064Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
