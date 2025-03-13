import Noise from "@/components/common/Noise";
import React, { ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { userApi } from "@/api/user/user";
import { redirect } from "next/navigation";

export default async function layout({ children }: { children: ReactNode }) {
  const user = await userApi.getCurrentUserInfo();
  if (user?.data.role !== "ADMIN") {
    redirect("/signin");
  }
  return (
    <Noise>
      <div className="w-full h-screen bg-site-bg overflow-x-hidden">
        <AdminHeader />
        <div className="flex gap-10">
          <AdminSidebar />
          <main className="ml-60 pl-7 mt-35 w-[calc(100%-270px)] mb-10">
            {children}
          </main>
        </div>
      </div>
    </Noise>
  );
}
