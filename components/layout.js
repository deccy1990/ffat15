import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children, title = 'Welcome' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="League of Legends Blog" />
      </Head>

      {/* Banner */}
      <div className="site-banner">
        <h1 className="banner-text"></h1>
      </div>

      {/* Navbar and Page Content */}
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </>
  );
}
