import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const dataFetch = useRef(false);

  useEffect(() => {
    if (dataFetch.current) return;
    dataFetch.current = true;
    if (!user) {
      router.push("/sign-in");
      toast.error("You must be logged in!");
    }
  }, []);

  return <>{user ? children : null}</>;
}
