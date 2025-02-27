"use client";

import { useEffect, useState } from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize(); // 초기 렌더링 시 한 번 실행
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}
