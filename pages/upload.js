/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import UploadPhoto from "@/utils/uploader";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

export default function upload() {
  const router = useRouter();
  const [uploadData, setUploadData] = useState({
    photoName: "",
    description: "",
    imageUrl: {},
  });

  const { photoName, description, imageUrl } = uploadData;

  const [loading, setLoading] = useState(false);

  function onChange(e) {
    if (e.target.files) {
      setUploadData((prevState) => ({
        ...prevState,
        imageUrl: e.target.files,
      }));
    }

    if (!e.target.files) {
      setUploadData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }

    console.log(uploadData);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const img = await Promise.all(
      // loop through all form images and start uploading it to firebase storage, using storeImage
      [...imageUrl].map((image) =>
        UploadPhoto(image).catch((error) => {
          setLoading(false);
          toast.error("Images not uploaded");
          throw error;
        })
      )
    );

    const uploadDataCopy = {
      ...uploadData,
      img,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
      userDisplayName: auth.currentUser.displayName,
    };

    delete uploadDataCopy.imageUrl;

    const docRef = await addDoc(collection(db, "photos"), uploadDataCopy);
    setLoading(false);
    toast.success("Photo Uploaded");
    router.push("/");
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <section class="py-8">
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap -mx-4 mb-8">
          <div class="w-full px-4">
            <div class="px-8 md:px-16 pt-16 pb-8 rounded-xl">
              <div class="max-w-xl mx-auto">
                <form onSubmit={onSubmit}>
                  <div class="flex flex-wrap -mx-4 -mb-10">
                    <div class="w-full  px-4 mb-10">
                      <div class="relative w-full h-14 py-4 px-3 border border-black hover:border-gray-600 focus-within:border-indigo-700 rounded-lg">
                        <span class="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                          Photo Name
                        </span>
                        <input
                          class="block w-full outline-none bg-transparent text-black placeholder-black font-semibold"
                          id="photoName"
                          type="text"
                          value={photoName}
                          onChange={onChange}
                          placeholder="Photo Name"
                        />
                      </div>
                    </div>

                    <div class="w-full px-4 mb-10">
                      <div class="relative w-full py-4 px-3 border border-black hover:border-gray-600 focus-within:border-indigo-700 rounded-lg">
                        <span class="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                          Description
                        </span>
                        <textarea
                          class="block w-full h-64 outline-none bg-transparent text-black placeholder-black font-semibold resize-none"
                          id="description"
                          type="text"
                          value={description}
                          onChange={onChange}
                          cols="30"
                          rows="10"
                          placeholder="Description of photo"
                        ></textarea>
                      </div>
                    </div>
                    <div class="w-full px-4 mb-10">
                      <div class="flex flex-wrap sm:flex-nowrap">
                        <div class="w-full py-8 px-4 text-center border-dashed border border-gray-400 hover:border-indigo-700 rounded-lg">
                          <div class="relative group h-14 w-14 mx-auto mb-4">
                            <div class="flex items-center justify-center h-14 w-14 bg-black group-hover:bg-indigo-700 rounded-full">
                              <svg
                                width="20"
                                height="20"
                                viewbox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.71 5.71002L9 3.41002V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8947 9.73478 14 10 14C10.2652 14 10.5196 13.8947 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V3.41002L13.29 5.71002C13.383 5.80375 13.4936 5.87814 13.6154 5.92891C13.7373 5.97968 13.868 6.00582 14 6.00582C14.132 6.00582 14.2627 5.97968 14.3846 5.92891C14.5064 5.87814 14.617 5.80375 14.71 5.71002C14.8037 5.61706 14.8781 5.50645 14.9289 5.3846C14.9797 5.26274 15.0058 5.13203 15.0058 5.00002C15.0058 4.86801 14.9797 4.7373 14.9289 4.61544C14.8781 4.49358 14.8037 4.38298 14.71 4.29002L10.71 0.290018C10.6149 0.198978 10.5028 0.127613 10.38 0.0800184C10.1365 -0.0199996 9.86346 -0.0199996 9.62 0.0800184C9.49725 0.127613 9.3851 0.198978 9.29 0.290018L5.29 4.29002C5.19676 4.38326 5.1228 4.49395 5.07234 4.61577C5.02188 4.73759 4.99591 4.86816 4.99591 5.00002C4.99591 5.13188 5.02188 5.26245 5.07234 5.38427C5.1228 5.50609 5.19676 5.61678 5.29 5.71002C5.38324 5.80326 5.49393 5.87722 5.61575 5.92768C5.73757 5.97814 5.86814 6.00411 6 6.00411C6.13186 6.00411 6.26243 5.97814 6.38425 5.92768C6.50607 5.87722 6.61676 5.80326 6.71 5.71002ZM19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8947 17.2652 18 17 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V11C2 10.7348 1.89464 10.4804 1.70711 10.2929C1.51957 10.1054 1.26522 10 1 10C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.7957 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z"
                                  fill="#E8EDFF"
                                ></path>
                              </svg>
                            </div>
                            <input
                              class="absolute top-0 left-0 h-14 w-14 opacity-0"
                              id="imageUrl"
                              type="file"
                              onChange={onChange}
                              accept=".jpg,.png,.jpeg"
                              required
                              name="filephoto"
                            />
                          </div>
                          <p class="font-semibold leading-normal mb-1">
                            <span class="text-black">
                              Click to upload a file
                            </span>
                          </p>
                          <span class="text-xs text-gray-300 font-semibold">
                            PNG, JPG, GIF or up to 10MB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-8 text-right">
                    <button
                      class="inline-block py-2 px-4 mb-2 text-xs text-center font-semibold leading-6 text-blue-50 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-200"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
