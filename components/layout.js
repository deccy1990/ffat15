// components/Layout.js
import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children, title = 'ffat15' }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Head>
        <title>{title}</title>
        <meta name="description" content="League of Legends blog" />
      </Head>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
