// pages/posts/page/[page].js
import { getAllPosts } from '../../../lib/posts';
import Link from 'next/link';
import Head from 'next/head';
import { POSTS_PER_PAGE } from '../../../constants/postsPerPage';

export async function getStaticPaths() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: `${i + 1}` },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page);
  const allPosts = getAllPosts();

  const start = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return {
    props: {
      posts: paginatedPosts,
      currentPage: page,
      totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
    },
  };
}

export default function PaginatedPosts({ posts, currentPage, totalPages }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Head>
        <title>Posts – Page {currentPage}</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Posts – Page {currentPage}</h1>

      {posts.map(post => (
        <div key={post.slug} className="mb-6">
          <h2 className="text-xl font-semibold">
            <Link href={`/posts/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      ))}

      {/* Pagination Navigation */}
      <div className="flex justify-between mt-10">
        {currentPage > 1 && (
          <Link href={`/posts/page/${currentPage - 1}`} className="text-blue-600 hover:underline">
            ← Previous
          </Link>
        )}
        {currentPage < totalPages && (
          <Link href={`/posts/page/${currentPage + 1}`} className="text-blue-600 hover:underline ml-auto">
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
