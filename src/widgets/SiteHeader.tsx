"use client";

import { useIsLoggedIn } from "@/shared/lib/useIsLoggedIn";
import Header from "@/widgets/Header";
import HeaderAuthenticated from "@/widgets/HeaderAuthenticated";

export default function SiteHeader() {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? <HeaderAuthenticated /> : <Header />;
}
