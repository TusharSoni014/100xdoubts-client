import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Signon = lazy(() => import("./pages/Signon"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LazyLoader() {
  return (
    <div className="h-[calc(100dvh-60px)] w-full flex justify-center items-center">
      <Loader />
    </div>
  );
}

export default function AllRoutes() {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/loading" element={<LazyLoader />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signon" element={<Signon />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
}
