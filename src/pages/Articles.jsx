import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCategories, fetchPostById, fetchPostsByCategory } from "../services/api";
import Content from "../components/Content";
import { FaRegFileAlt } from "react-icons/fa";
import "./article.css"
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
    <div className="post-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">{post?.title || "Loading..."}</h1>
        <p className="hero-meta">
          Category: {name || "Unknown"} •{" "}
          {post?.updated_at
            ? `Modified on ${new Date(post.updated_at).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}`
            : "Modified date not available"}
        </p>
      </section>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Main Article */}
        <section className="article-section">
          {loadingPost ? (
            <p className="loading-text">Loading post...</p>
          ) : post ? (
            <Content post={post} />
          ) : (
            <p className="loading-text">Post not found</p>
          )}
        </section>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Explore Other Articles */}
          <div className="other-articles">
            <h3 className="section-heading">
              Explore all articles from{" "}
              <span className="highlight">{name || "this category"}</span>
            </h3>

            <div className="articles-container-1">
              {getOtherPosts && getOtherPosts.length > 0 ? (
                <div className="articles-list-1" >
                  {getOtherPosts.map((article, idx) => (
                    <Link
                      key={idx}
                      to={`/category/${id}/${name}/${article?.id}/${article?.title
                        ?.replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      className="article-item"
                    >
                      <FaRegFileAlt className="article-icon-inner" />
                      {/* <div className="article-icon">
                      </div> */}

                      <div className="article-info-1">
                        <p className="article-title">{article.title}</p>
                        <p className="article-date">
                          Modified on{" "}
                          <span>
                            {new Date(
                              article.updated_at
                            ).toLocaleDateString("en-US", {
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
                <p className="no-articles">No related articles found.</p>
              )}
            </div>
          </div>

          <hr className="divider" />

          {/* All Categories */}
          <div className="all-categories">
            <h2 className="section-title">All Categories</h2>
            {loadingCategories ? (
              <p className="loading-text">Loading categories...</p>
            ) : (
              <div className="categories-list">
                {categories?.map((cat, idx) => (
                  <Link
                    key={idx}
                    to={`/category/${cat.id}/${encodeURIComponent(cat.name)}`}
                    className="category-item"
                  >
                    <div className="category-icon">
                      {cat.img ? (
                        <img
                          src={cat.img}
                          alt={cat.name}
                          className="category-img"
                        />
                      ) : (
                        <span className="category-placeholder">
                          {cat.name?.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="category-info">
                      <h3 className="category-name">{cat.name}</h3>
                      {cat?.tags?.length > 0 && (
                        <div className="category-tags">
                          {cat.tags.map((tag, tid) => (
                            <span key={tid} className="category-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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
