import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createUser } from "./actions";

export default async function Home() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Create a user</h2>
        <form action={createUser} className="flex gap-2">
          <input
            name="name"
            placeholder="Your name"
            required
            className="border rounded px-3 py-2 flex-1"
          />
          <button className="bg-black text-white px-4 py-2 rounded">
            Create
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="space-y-1">
          {users.map((u) => (
            <li key={u.id}>
              <Link href={`/users/${u.id}`} className="text-blue-600 underline">
                {u.name}
              </Link>{" "}
              <span className="text-gray-500">({u._count.posts} posts)</span>
            </li>
          ))}
          {users.length === 0 && (
            <li className="text-gray-500">No users yet.</li>
          )}
        </ul>
      </section>
    </main>
  );
}