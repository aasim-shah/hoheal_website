"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import getNavMenuByRole from "@/utils/navMenu";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setRole, setToken } from "@/store/features/authSlice";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const token: string = useSelector((state: any) => state.auth.token);
  const role: Role = useSelector((state: any) => state.auth.role);

  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const handleTokenCheck = () => {
      const storedToken =
        typeof window !== "undefined" && localStorage.getItem("token");

      if (!token && !storedToken) {
        router.push("/login");
        return;
      }
      if (!token && storedToken) {
        try {
          const decodedToken: any = jwtDecode(storedToken);
          const isTokenExpired = decodedToken.exp * 1000 < Date.now();

          if (isTokenExpired) {
            router.push("/login");
          } else {
            dispatch(setToken(storedToken));
            if (decodedToken.role) {
              dispatch(setRole(decodedToken.role));
            } else {
              router.push("/login");
            }
          }
        } catch (error) {
          console.error("Token decoding failed:", error);
          router.push("/login");
        }
      } else if (token && !role) {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.role) {
          dispatch(setRole(decodedToken.role));
        } else {
          router.push("/login");
        }
      }
    };

    const handleNavigation = () => {
      if (!role) return;

      const menu = getNavMenuByRole(role);
      const allowedPaths = menu.map((item) => item.path);
      const firstPath = allowedPaths[0];

      if (!allowedPaths.includes(pathname)) {
        router.push(firstPath);
      } else if (token && pathname.includes("login")) {
        router.push(firstPath || "/");
      } else if (!token && allowedPaths.includes(pathname)) {
        router.push("/login");
      }
    };

    handleTokenCheck();
    handleNavigation();
    setIsLoading(false);
  }, [dispatch, router, token, role]);

  return isLoading ? null : children;
};

export default AuthGuard;