"use client";

import { addHotel } from "@/lib/api/hotel";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

// Define types for input and return value
interface FormInput {
    
}

interface Response {
  token: string; 
}

export const useHotel = (): UseMutationResult<
  Response,
  Error,
  FormInput
> => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation<Response, Error, FormInput>({
    mutationFn: (data: FormInput) => addHotel(data),
    onSuccess: (data: any) => {
      if (data.body.token) {
      }
    },
    onError: (error: Error) => {
      alert(error.message || "");
    },
  });
};
