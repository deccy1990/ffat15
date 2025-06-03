// pages/posts/index.js
import { getAllPosts } from '../lib/posts';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function PostsPage({ posts }) {
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags?.includes(selectedTag))
    : posts;

  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-3 py-1 rounded-full border ${selectedTag === null ? 'bg-black text-white' : 'bg-white border-gray-300'}`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                selectedTag === tag ? 'bg-black text-white' : 'bg-white border-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Post List */}
        {filteredPosts.map(post => (
          <div key={post.slug} className="mb-8">
            <h2 className="text-xl font-semibold">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">{post.date}</p>
            <div className="text-sm text-gray-600 mt-1">
              Tags: {post.tags?.join(', ') || 'none'}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
