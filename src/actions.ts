"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateTagAction(tagName: string) {
  revalidateTag(tagName);
}

export async function revalidatePathAction(pathName: string) {
  revalidatePath(pathName);
}
