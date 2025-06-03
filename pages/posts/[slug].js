import { getPostData } from '../../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import Navbar from '../../components/Navbar';

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
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{post.date}</p>
        <div className="mb-4 text-sm text-gray-600">
          Tags: {post.tags?.join(', ') || 'none'}
        </div>
        <article
          className="prose prose-purple max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>
    </div>
  );
}
