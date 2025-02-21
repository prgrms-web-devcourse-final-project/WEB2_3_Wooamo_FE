import Noise from "@/components/common/Noise";
import React, { ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Noise>
      <div className="w-full h-screen bg-site-bg overflow-x-hidden">
        <AdminHeader />
        <div className="flex gap-10">
          <AdminSidebar />
          <main className="ml-66 mt-35 w-[80%] mb-10">{children}</main>
        </div>
      </div>
    </Noise>
  );
}
