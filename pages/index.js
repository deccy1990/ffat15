// pages/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | ffat15</title>
        <meta name="description" content="League of Legends blog" />
      </Head>

      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to ffat15</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          A blog dedicated to everything <span className="font-semibold">League of Legends</span> —
          from Jungle strategies, champion breakdowns, patch analysis, to gameplay tips and personal ranked journeys.
        </p>
      </section>

      <section className="grid gap-6 max-w-xl mx-auto">
        <div className="bg-white border border-gray-300 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href="/posts/page/1" className="hover:underline">
              Read Posts
            </Link>
          </h2>
          <p className="text-gray-700">Explore guides, game reviews, and tactical insights.</p>
        </div>

        <div className="bg-white border border-gray-300 p-6 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href="/about" className="hover:underline">
              About ffat15
            </Link>
          </h2>
          <p className="text-gray-700">Get to know the jungler behind the keyboard (Nocturne main 👻).</p>
        </div>
      </section>
    </>
  );
}
