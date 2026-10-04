import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createPost, deletePost } from "@/app/actions";

export default async function UserPage({ params }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: { orderBy: { createdAt: "desc" } } },
  });


  export default async function PostPage({ params }) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!post) notFound();

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-4">
      <Link
        href={`/users/${post.authorId}`}
        className="text-blue-600 underline"
      >
        ← Back to {post.author.name}
      </Link>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-sm">
        by {post.author.name} · {post.createdAt.toLocaleDateString()}
      </p>
      {post.content && <p className="whitespace-pre-wrap">{post.content}</p>}
    </main>
  );
}

  if (!user) notFound();

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-8">
      <Link href="/" className="text-blue-600 underline">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold">{user.name}&apos;s posts</h1>

      <form action={createPost} className="space-y-2 border p-4 rounded">
        <input type="hidden" name="authorId" value={user.id} />
        <input
          name="title"
          placeholder="Post title"
          required
          className="border rounded px-3 py-2 w-full"
        />
        <textarea
          name="content"
          placeholder="Content (optional)"
          rows={4}
          className="border rounded px-3 py-2 w-full"
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          Add post
        </button>
      </form>

      <section className="space-y-4">
        {user.posts.map((p) => (
          <article key={p.id} className="border rounded p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  href={`/posts/${p.id}`}
                  className="text-lg font-semibold text-blue-600 underline"
                >
                  {p.title}
                </Link>
                {p.content && (
                  <p className="mt-1 whitespace-pre-wrap">{p.content}</p>
                )}
              </div>
              <form action={deletePost}>
                <input type="hidden" name="id" value={p.id} />
                <button className="text-red-600 text-sm underline">
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
        {user.posts.length === 0 && (
          <p className="text-gray-500">No posts yet — add one above.</p>
        )}
      </section>
    </main>
  );
}