import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCategories, fetchPostById, fetchPostsByCategory } from "../services/api";
import Content from "../components/Content";
import { FaRegFileAlt } from "react-icons/fa";

const ArticlePage = () => {
  const { id, name, postId } = useParams();

  const [post, setPost] = useState(null); // single post
  const [categories, setCategories] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [getOtherPosts, setGetOtherPosts] = useState([]);

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


  useEffect(() => {
    if (id) {
      fetchPostsByCategory(id)
        .then((data) => setGetOtherPosts(data))
        .catch((err) => console.error(err));
    }
  }, [id]);


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
   {/* Main Grid */}
<div className="w-full flex flex-col md:flex-row gap-8 px-6 py-12 items-start">
  
  {/* Main Article */}
  <section className="flex-1 bg-white shadow-md rounded-xl p-6 md:p-8 min-w-[60%]">
    {loadingPost ? (
      <p className="text-gray-500">Loading post...</p>
    ) : post ? (
      <Content post={post} />
    ) : (
      <p className="text-gray-500">Post not found</p>
    )}
  </section>

  {/* Sidebar */}
  <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 bg-white rounded-3xl p-6 shadow-xl space-y-10">
    {/* 🔹 Section 1: Explore Other Articles */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Explore all articles from{" "}
        <span className="text-indigo-600 font-bold">
          {name || "this category"}
        </span>
      </h3>

      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-4 shadow-md border border-indigo-100">
        {getOtherPosts && getOtherPosts.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {getOtherPosts.map((article, idx) => (
              <Link
                key={idx}
                to={`/category/${id}/${name}/${article?.id}/${article?.title
                  ?.replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group border border-transparent hover:border-indigo-100"
              >
                {/* Thumbnail/Icon */}
                <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300">
                  <FaRegFileAlt className="text-gray-400 text-xl group-hover:text-indigo-600 transition-colors duration-300" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate group-hover:text-indigo-700">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Modified on{" "}
                    <span className="font-medium text-gray-600">
                      {new Date(article.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No related articles found.</p>
        )}
      </div>
    </div>

    {/* Divider */}
    <hr className="border-gray-200" />

    {/* 🔹 Section 2: All Categories */}
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-700">All Categories</h2>
      {loadingCategories ? (
        <p className="text-gray-400 italic">Loading categories...</p>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {categories?.map((cat, idx) => (
            <Link
              key={idx}
              to={`/category/${cat.id}/${encodeURIComponent(cat.name)}`}
              className="block p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <div className="flex items-center gap-3">
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
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium group-hover:text-indigo-700">
                    {cat.name}
                  </h3>
                  {cat?.tags?.length > 0 && (
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
    </div>
  </aside>
</div>

    </div>
  );
};

export default ArticlePage;
