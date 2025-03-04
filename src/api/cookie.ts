"use server";

import { cookies } from "next/headers";

export async function setCookieAtServer(key: string, value: string) {
  (await cookies()).set(key, value);
}

export async function getCookieAtServer(key: string) {
  return (await cookies()).get(key)?.value;
}

export async function deleteCookieAtServer(key: string) {
  (await cookies()).delete(key);
}

export async function hasCookieAtServer(key: string) {
  return (await cookies()).has(key);
}
