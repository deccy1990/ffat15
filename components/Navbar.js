// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white px-4 py-3 border-b border-gray-200">
      <div className="max-w-4xl mx-auto flex gap-4">
        <Link href="/" legacyBehavior>
          <a className="text-black hover:underline">Home</a>
        </Link>
        <Link href="/posts/page/1" legacyBehavior>
          <a className="text-black hover:underline">Posts</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className="text-black hover:underline">placeholder</a>
        </Link>
                <Link href="/about" legacyBehavior>
          <a className="text-black hover:underline">placeholder</a>
        </Link>
                <Link href="/about" legacyBehavior>
          <a className="text-black hover:underline">placeholder</a>
        </Link>
                <Link href="/about" legacyBehavior>
          <a className="text-black hover:underline">placeholder</a>
        </Link>
      </div>
    </nav>
  );
}
