"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import getNavMenuByRole from "@/utils/navMenu";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setRole, setToken, setUserProfile } from "@/store/features/authSlice";
import useApi from "@/hooks/useApi";
import { getUserData } from "@/lib/api/auth";
import { setHotelId } from "@/store/features/hotelSlice";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, error, loading, execute } = useApi(getUserData);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const token: string = useSelector((state: any) => state.auth.token);
  const role: Role = useSelector((state: any) => state.auth.role);

  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const handleTokenCheck = () => {
      const storedToken =
        typeof window !== "undefined" && localStorage.getItem("token");
    
      const currentLocale = pathname.split("/")[1]; // Extract locale from pathname
    
      if (!token && !storedToken) {
        router.push(`/${currentLocale}/login`);
        return;
      }
      if (!token && storedToken) {
        try {
          const decodedToken: any = jwtDecode(storedToken);
          const isTokenExpired = decodedToken.exp * 1000 < Date.now();
    
          if (isTokenExpired) {
            router.push(`/${currentLocale}/login`);
          } else {
            dispatch(setToken(storedToken));
            if (decodedToken.role) {
              dispatch(setRole(decodedToken.role));
            } else {
              router.push(`/${currentLocale}/login`);
            }
          }
        } catch (error) {
          console.error("Token decoding failed:", error);
          router.push(`/${currentLocale}/login`);
        }
      } else if (token && !role) {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.role) {
          dispatch(setRole(decodedToken.role));
        } else {
          router.push(`/${currentLocale}/login`);
        }
      }
    };
    

    const handleNavigation = () => {
      if (!role) return;
    
      const menu = getNavMenuByRole(role);
      const allowedPaths = menu.map((item) => item.path);
      const firstPath = allowedPaths[0];
    
      // Extract locale from pathname (e.g., /en/dashboard)
      const currentLocale = pathname.split("/")[1];
    
      if (!allowedPaths.includes(pathname)) {
        router.push(`/${currentLocale}${firstPath}`);
      } else if (token && pathname.includes("login")) {
        router.push(`/${currentLocale}${firstPath || "/"}`);
      } else if (!token && allowedPaths.includes(pathname)) {
        router.push(`/${currentLocale}/login`);
      }
    };
    

    (async () => {
      await handleTokenCheck();
      handleNavigation();
      setIsCheckingAuth(false);
    })();
  }, [dispatch, router, token, role]);

  useEffect(() => {
    if (token) {
      execute();
    }
  }, [token, execute]);

  useEffect(() => {
    if (data) {
      dispatch(setUserProfile(data?.body?.user));
      dispatch(setHotelId(data?.body?.user?.hotel?._id));
    }
  }, [data, dispatch]);

  // Show nothing while checking authentication
  if (isCheckingAuth) return null;

  return children;
};

export default AuthGuard;
