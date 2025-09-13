"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { loadToken } from "@/store/authSlice";

export default function Home() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <h1>Welcome to Smart Support Hub</h1>
    </div>
  );
}
