import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300">
          ffat15
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="C:\Users\decla\ffat15\posts" className="hover:underline">Posts</Link>
        </div>
      </div>
    </nav>
  );
}
