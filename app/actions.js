"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");

  const user = await prisma.user.create({ data: { name } });
  revalidatePath("/");
  redirect(`/users/${user.id}`);
}

export async function createPost(formData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const authorId = String(formData.get("authorId") ?? "");

  if (!title) throw new Error("Title is required");
  if (!authorId) throw new Error("Author is required");

  await prisma.post.create({
    data: {
      title,
      content: content || null,
      authorId,
      published: true,
    },
  });

  revalidatePath(`/users/${authorId}`);
  revalidatePath("/");
}

export async function deletePost(formData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const post = await prisma.post.delete({ where: { id } });
  revalidatePath(`/users/${post.authorId}`);
  revalidatePath("/");
}