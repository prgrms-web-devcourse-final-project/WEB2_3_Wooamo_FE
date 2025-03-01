"use client";

import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeaderProps {
  serverIsLoggedIn: boolean;
}

export default function Header({ serverIsLoggedIn }: HeaderProps) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <MobileHeader serverIsLoggedIn={serverIsLoggedIn} />
  ) : (
    <DesktopHeader serverIsLoggedIn={serverIsLoggedIn} />
  );
}
