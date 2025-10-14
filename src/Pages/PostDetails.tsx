import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
}

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(data);

        const userRes = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${data.userId}`
        );
        setAuthor(userRes.data);
      } catch {
        console.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen ">
        <p className="text-white text-xl animate-pulse">Loading article...</p>
      </div>
    );

  if (!post)
    return (
      <div className="text-center text-red-500 mt-20 text-lg">
        Post not found.
      </div>
    );

  return (
    <div className="relative min-h-screen text-white py-16 px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-3xl mx-auto backdrop-blur-xl bg-white/20 border border-white/20 rounded-3xl shadow-xl p-8"
      >
        <Link
          to="/"
          className="inline-flex items-center text-white transition mb-4"
        >
          ← Back to Home
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-white"
        >
          {post.title}
        </motion.h1>

        {author && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-100 mb-8"
          >
            Written by{" "}
            <span className="font-semibold text-orange-200">{author.name}</span>
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-100 leading-relaxed text-lg tracking-wide"
        >
          {post.body}
        </motion.p>

        <div className="mt-10 border-t border-white/20 pt-6 flex justify-between items-center">
          <p className="text-gray-300 text-sm">© 2025 Blog</p>
          <Link
            to="/"
            className="text-orange-200 hover:text-blue-100 transition text-sm"
          >
            More Articles →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
