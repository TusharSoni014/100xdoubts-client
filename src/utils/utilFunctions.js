import { toast } from "react-toastify";

export const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/google/login`;
};

export const handleCatch = (error) => {
  toast.error(error?.data?.message);
  console.log(error);
};
