"use client";

import { authApi } from "@/api/auth/auth";

export default function ButtonExample() {
  const handleClick = async () => {
    const res = await authApi.reissue();
    console.log(res);
  };
  return <button onClick={handleClick}>버튼</button>;
}
