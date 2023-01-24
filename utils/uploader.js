import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { auth } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

export default async function UploadPhoto(image) {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
    console.log("[UPLOAD PHOTO]", storage);
    console.log("[UPLOAD PHOTO]", filename);
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Adding a identifier for the url & file name so it can be accessed later
          resolve(`${downloadURL}@${filename}`);
        });
      }
    );
  });
}
