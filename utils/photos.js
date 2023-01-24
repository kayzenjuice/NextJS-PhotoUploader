import { db } from "@/config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default async function getPhotos(
  setLastFetchedListing,
  setLoading,
  quantity
) {
  try {
    const photosRef = collection(db, "photos");
    const q = query(photosRef, orderBy("timestamp", "desc"), limit(quantity));

    const querySnap = await getDocs(q);
    const lastVisible = querySnap.docs[querySnap.docs.length - 1];
    setLastFetchedListing(lastVisible);
    const photos = [];
    querySnap.forEach((doc) => {
      return photos.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    setLoading(false);
    return photos;
  } catch (error) {
    toast.error("Could not fetch listing");
    console.log("[PHOTOS]", error);
    return;
  }
}

export async function getAllPhotos() {
  try {
    const photosRef = collection(db, "photos");

    const querySnap = await getDocs(photosRef);
    const photos = [];
    querySnap.forEach((doc) => {
      return photos.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return photos;
  } catch (error) {
    toast.error("Could not fetch photos");
    console.log("[PHOTOS]", error);
    return;
  }
}

export async function getPhoto(id) {
  try {
    const querySnap = await getDoc(doc(db, "photos", id));

    if (querySnap.exists()) {
      console.log("Document data:", querySnap.data());
      return JSON.stringify(querySnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    toast.error("Could not fetch photos");
    console.log("[PHOTOS]", error);
    return;
  }
}

export async function getMorePhotos(
  setLastFetchedListing,
  setLoading,
  lastFetchedPhoto,
  quantity
) {
  try {
    const photosRef = collection(db, "photos");
    const q = query(
      photosRef,
      orderBy("timestamp", "desc"),
      startAfter(lastFetchedPhoto),
      limit(quantity)
    );

    const querySnap = await getDocs(q);
    const lastVisible = querySnap.docs[querySnap.docs.length - 1];
    setLastFetchedListing(lastVisible);
    const photos = [];
    querySnap.forEach((doc) => {
      return photos.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    setLoading(false);
    return photos;
  } catch (error) {
    return;
  }
}
