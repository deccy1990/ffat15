import { getPostData } from '../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Navbar from 'components/Navbar';

const getShareUrl = (slug) => `http://localhost:3000/posts/${slug}`;

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  const postsDir = path.join(process.cwd(), 'posts');

  const filenames = fs.readdirSync(postsDir);
  const slugs = filenames.map((file) => file.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostData(params.slug);
  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      post: {
        ...post,
        contentHtml,
      },
    },
  };
}

export default function Post({ post }) {
  return (
    <div>
      <Head>
        <title>{post.title} | Your Blog Name</title>
        <meta name="description" content={`Read "${post.title}" on Your Blog Name.`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={`Read "${post.title}" on Your Blog Name.`} />
        {post.thumbnail && (
          <meta property="og:image" content={post.thumbnail} />
        )}
      </Head>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{post.date}</p>

        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={`Thumbnail for ${post.title}`}
            className="w-full h-auto rounded-md mb-6"
          />
        )}

        <div className="mb-4 text-sm text-gray-600">
          Tags: {post.tags?.join(', ') || 'none'}
        </div>

        <article
          className="prose prose-purple max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}

        />

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Share this post:</h3>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl(post.slug))}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Twitter
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl(post.slug))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
            >
              Facebook
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl(post.slug))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-900 px-4 py-2 rounded hover:bg-blue-950"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
