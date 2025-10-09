import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCategories, fetchPostById } from "../services/api";
import Content from "../components/Content";

const ArticlePage = () => {
  const { id, name, postId } = useParams();

  const [post, setPost] = useState(null); // single post
  const [categories, setCategories] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch post data
  useEffect(() => {
    if (postId) {
      setLoadingPost(true);
      fetchPostById(postId)
        .then((data) => setPost(data))
        .catch((err) => console.error("Failed to fetch post:", err))
        .finally(() => setLoadingPost(false));
    }
  }, [postId]);

  // Fetch categories
  useEffect(() => {
    setLoadingCategories(true);
    fetchCategories()
      .then((data) => setCategories(data || []))
      .catch((err) => console.error("Failed to fetch categories:", err))
      .finally(() => setLoadingCategories(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1A2C40] text-white pt-20 pb-8 px-6 flex flex-col items-start">
        <h1 className="text-xl md:text-4xl font-bold mb-2">
          {post?.title || "Loading..."}
        </h1>
       <p className="text-md mt-2 text-[#879ED0]">
  Category: {name || "Unknown"} •{" "}
  {post?.updated_at
    ? `Modified on ${new Date(post.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`
    : "Modified date not available"}
</p>

      </section>

      {/* Main Grid */}
   <div className="w-full flex flex-col md:flex-row gap-8 px-6 py-12 items-start">

        {/* Main Article */}
        <section className="md:col-span-2 bg-white shadow-md rounded-xl p-6 md:p-8">
          {loadingPost ? (
            <p className="text-gray-500">Loading post...</p>
          ) : post ? (
            <Content post={post} />
          ) : (
            <p className="text-gray-500">Post not found</p>
          )}
        </section>

        {/* Sidebar */}
        <aside className="bg-white rounded-3xl p-6 shadow-xl w-full md:w-72 lg:w-85 flex-shrink-0">
          {/* Sidebar Title */}
          <h2 className="text-2xl font-bold mb-6 text-gray-700">All Categories</h2>

          {loadingCategories ? (
            <p className="text-gray-400 italic">Loading categories...</p>
          ) : (
            <div className="space-y-4">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={`/category/${cat.id}/${encodeURIComponent(cat.name)}`}
                  className="block p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    {cat.img ? (
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <img
                          src={cat.img}
                          alt={cat.name}
                          className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-indigo-200 flex items-center justify-center">
                        <span className="text-white font-bold">{cat.name?.charAt(0)}</span>
                      </div>
                    )}

                    {/* Name and tags */}
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-medium group-hover:text-indigo-700">
                        {cat.name}
                      </h3>

                      {/* Tags */}
                      {cat.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {cat.tags.map((tag, tid) => (
                            <span
                              key={tid}
                              className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>



      </div>
    </div>
  );
};

export default ArticlePage;
