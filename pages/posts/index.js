import { getAllPosts } from '../../lib/posts';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';

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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags?.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesTag && matchesSearch;
  });

  return (
    <div>
      <Head>
        <title>Posts | Your Blog Name</title>
        <meta name="description" content="Browse all blog posts on Your Blog Name by tags and search." />
      </Head>

     

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

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
              className={`px-3 py-1 rounded-full border ${selectedTag === tag ? 'bg-black text-white' : 'bg-white border-gray-300'}`}
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
            <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-2">
              {post.tags?.map(tag => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-blue-600 hover:underline"
                >
                  #{tag}
                </Link>
              )) || 'none'}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
