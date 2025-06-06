// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import PostCard from '/components/PostCard';
import { getAllPosts } from '/lib/posts';

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function HomePage({ posts }) {


  return (
    <>
      <Head>
        <title>Home | ffat15</title>
        <meta name="description" content="League of Legends blog" />
      </Head>

      {/* Welcome section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to ffat15</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          A blog dedicated to everything <span className="font-semibold">League of Legends</span> —
          from Jungle strategies, champion breakdowns, patch analysis.
        </p>
      </section>

      {/* Featured Posts Section */}

      <section className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold mb-6">Latest Posts</h2>
        {posts.slice(0, 3).map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
        <div className="text-center mt-6">
          <Link href="/posts/page/1" className="text-blue-600 hover:underline">
            View All Posts →
          </Link>
        </div>
      </section>


      {/* Featured Posts/vods Section 
      <section className="grid gap-6 max-w-xl mx-auto">
        <div className="bg-white border border-gray-300 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href="/posts/page/1" className="hover:underline">
              Read Posts
            </Link>
          </h2>
          <p className="text-gray-700">Explore Patch notes</p>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href="/about" className="hover:underline">
              Low elo VOD's
            </Link>
          </h2>
          <p className="text-gray-700">Low elo VOD's👻.</p>
        </div>
      </section>
      {/* End of main content */}
    </>
  ); 
}
