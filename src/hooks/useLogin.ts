"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { setToken } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";

// Define types for input and return value
interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string; // Assuming the login response includes a token
}

export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginInput
> => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: ({ email, password }: LoginInput) => loginUser(email, password),
    onSuccess: (data: any) => {
      if (data.body.token) {
        localStorage.setItem("token", data.body.token);
        dispatch(setToken(data.body.token));
        router.push("/");
      }
    },
    onError: (error: Error) => {
      alert(error.message || "Login failed");
    },
  });
};
