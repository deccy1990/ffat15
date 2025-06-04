// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-100 px-4 py-3 border-b">
      <div className="max-w-4xl mx-auto flex gap-4">
        <Link href="/" legacyBehavior>
          <a className="text-blue-600 hover:underline">Home</a>
        </Link>
        <Link href="/posts" legacyBehavior>
          <a className="text-blue-600 hover:underline">Posts</a>
        </Link>
      </div>
    </nav>
  );
}
