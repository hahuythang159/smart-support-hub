"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Topbar from "@/components/layout/Topbar";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch()
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (token) {
      dispatch(loginSuccess({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <Topbar />
      <h1>Welcome to Smart Support Hub</h1>
    </div>
  );
}
