import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Title from "@/components/Title";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const AuthRequired = ["/upload"];

  return (
    <AuthContextProvider>
      <Title text={"Uploadify"} />
      <NavBar />
      {AuthRequired.includes(router.pathname) ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <>
          <Component {...pageProps} />
        </>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AuthContextProvider>
  );
}
