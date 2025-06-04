import { getAllPosts } from '/lib/posts';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';
import Layout from '/components/Layout'; // ✅ Correct relative path

const POSTS_PER_PAGE = 5;

export async function getStaticPaths() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page || '1');
  const allPosts = getAllPosts();

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const paginatedPosts = allPosts.slice(start, end);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return {
    props: {
      posts: paginatedPosts,
      currentPage: page,
      totalPages,
    },
  };
}

export default function PostsPage({ posts, currentPage, totalPages }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags?.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesTag && matchesSearch;
  });

  return (
    <Layout title={`Posts | Page ${currentPage}`}>
      <Head>
        <meta name="description" content={`Posts on page ${currentPage} of ${totalPages}`} />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Posts – Page {currentPage}</h1>

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
            ))}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        {currentPage > 1 && (
          <Link href={`/posts/page/${currentPage - 1}`} className="px-4 py-2 border rounded">
            Previous
          </Link>
        )}
        {currentPage < totalPages && (
          <Link href={`/posts/page/${currentPage + 1}`} className="px-4 py-2 border rounded">
            Next
          </Link>
        )}
      </div>
    </Layout>
  );
}
