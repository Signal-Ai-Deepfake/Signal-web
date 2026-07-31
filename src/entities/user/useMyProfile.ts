"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "./api";

export const MY_PROFILE_QUERY_KEY = ["myProfile"];

export function useMyProfile() {
  return useQuery({ queryKey: MY_PROFILE_QUERY_KEY, queryFn: getMyProfile });
}
