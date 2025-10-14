import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // first 6 posts

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch(() => setError("Failed to fetch posts"))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // Next 6 posts
  };

  if (loading)
    return (
      <div className="flex justify-center items-center ">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center satisfy-regular mb-12 text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover Inspiring Blog Posts 
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <input
            type="text"
            placeholder="Search posts by title..."
            className="w-full md:w-1/2 p-3 border-2 border-gray-100 bg-white text-orange-500 rounded-xl shadow-sm focus:ring-3 focus:ring-orange-500 focus:outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {visiblePosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <div>
                <h2 className="text-2xl font-semibold mb-3 font-serif text-gray-800 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 font-light line-clamp-3">
                  {post.body.slice(0, 100)}...
                </p>
              </div>
              <Link
                to={`/post/${post.id}`}
                className="bg-orange-500 text-white py-2 w-fit px-7 rounded-full text-center font-medium hover:text-orange-500 hover:bg-white duration-300 transition self-start"
              >
                Read More 
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-full bg-white text-orange-500 font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>
      <footer className="text-center">
        <h1 className="py-5 text-orange-200">Designed By TazTahir</h1>
      </footer>
    </div>
  );
}
