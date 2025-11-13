import { FaRegFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import './style.css'
const ArticlesSection = ({ posts = [], searchTerm, loading }) => {
  const latestPosts = posts.slice(0, 9);

  return (
    <div className="articles-container">
      {/* Header */}
      <div className="articles-header">
        <h2 className="articles-title">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Latest Articles"}
        </h2>
      </div>

      {loading ? (
        <p className="loading-text">Searching...</p>
      ) : latestPosts.length === 0 ? (
        <p className="no-articles">No articles found.</p>
      ) : (
        <div className="articles-list-2">
          {latestPosts.map((article, idx) => (
            <div key={idx} className="article-card">
              {/* Left: Icon + Content */}
              <div className="article-info">
                <div className="article-icon">
                  <FaRegFileAlt className="article-file-icon" />
                </div>

                <div>
                  <h3 className="article-heading">
                    {article.title
                      ? article.title.length > 40
                        ? article.title.slice(0, 40) + "..."
                        : article.title
                      : "Untitled Article"}
                  </h3>

                  <p className="article-date">
                    {article.updated_at
                      ? `Modified on ${new Date(article.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`
                      : "N/A"}
                  </p>
                  <Link
                    to={`/category/${article?.categories[0]?.id}/${article?.categories[0]?.name}/${article.id}/${article.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    className="read-more"
                  >
                    Read More
                  </Link>
                </div>
              </div>

              {/* Right: Categories */}
              <div className="article-categories">
                {article.categories?.slice(0, 2).map((cat) => (
                  <span key={cat.id} className="category-badge">
                    {cat.name}
                  </span>
                ))}
                {article.categories?.length > 2 && (
                  <span className="category-extra">
                    +{article.categories.length - 2}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesSection;
