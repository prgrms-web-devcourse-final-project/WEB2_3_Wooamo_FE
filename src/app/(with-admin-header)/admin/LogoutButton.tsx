"use client";

import { authApi } from "@/api/auth/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await authApi.logout();
    router.replace("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-3 bg-site-white-70 rounded-lg cursor-pointer"
    >
      Logout
    </button>
  );
}
