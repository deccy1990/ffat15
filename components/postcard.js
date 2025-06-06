// components/PostCard.js
import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
          {post.title}
        </Link>
      </h2>
      <p className="text-sm text-gray-500 mb-3">{post.date}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags?.map(tag => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${tag}.png`}
              alt={tag}
              className="w-4 h-4 rounded-full"
              onError={(e) => (e.target.style.display = 'none')}
            />
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-700 text-sm">
        {post.content.slice(0, 150)}...
      </p>
    </div>
  );
}
