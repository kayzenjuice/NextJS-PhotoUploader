import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("API KEY", process.env.NEXT_PUBLIC_apiKey);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    let userCreds;
    try {
      userCreds = await createUserWithEmailAndPassword(auth, email, password);
      console.log("[SIGNUP]", userCreds);
      toast.success("Sign up was successful");
      router.push("/");
      return userCreds;
    } catch (e) {
      toast.error("Something went wrong please try again");
      console.log(e);
    }

    return;
  };

  const login = async (email, password) => {
    let userCreds;
    try {
      userCreds = await signInWithEmailAndPassword(auth, email, password);

      toast.success("Sign in was successful");
      router.push("/");
      return userCreds;
    } catch (e) {
      toast.error("Something went wrong please try again");
      console.log(e);
    }

    return;
  };

  const logout = async () => {
    let userCreds;
    try {
      userCreds = auth.signOut();
      setUser(null);
      router.push("/");
      return userCreds;
    } catch (e) {
      toast.error("Something went wrong please try again");
      console.log(e);
    }

    return;
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signUp,
        login,
        logout,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
