"use server";

import { cookies } from "next/headers";

export async function setCookieAtServer(key: string, value: string) {
  (await cookies()).set(key, value);
}

export async function getCookieAtServer(key: string) {
  return (await cookies()).get(key)?.value;
}
