// pages/tags/[tag].js
import { getAllPosts } from '../../lib/posts';
import Link from 'next/link';

export async function getStaticPaths() {
  const posts = getAllPosts();

  // Get all unique tags from all posts
  const tags = [...new Set(posts.flatMap(post => post.tags || []))];

  const paths = tags.map(tag => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter(post =>
    (post.tags || []).includes(params.tag)
  );

  return {
    props: {
      tag: params.tag,
      posts: filteredPosts,
    },
  };
}

export default function TagPage({ tag, posts }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posts tagged with: {tag}</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <p className="text-lg text-blue-600 hover:underline">{post.title}</p>
            </Link>
            <p className="text-sm text-gray-600">{post.date}</p>
          </li>
        ))}
      </ul>
      <Link href="/posts" className="inline-block mt-6 text-blue-500 hover:underline">
        ← Back to all posts
      </Link>
    </div>
  );
}
