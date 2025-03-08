"use client";

import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Header() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}
