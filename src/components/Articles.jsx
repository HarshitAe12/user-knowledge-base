import { FaRegFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArticlesSection = ({ posts = [], searchTerm, loading }) => {
  const latestPosts = posts.slice(0, 9);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Latest Articles"}
        </h2>
      </div>

      {loading ? (
        <p>Searching...</p>
      ) : latestPosts.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="space-y-4">
          {latestPosts.map((article, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              {/* Left: image/video + title + date */}
              <div className="flex items-center gap-3">
                {/* Image/Video */}

                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaRegFileAlt className="text-gray-400 text-lg" />
                </div>


                {/* Title & Date */}
                <div>
                  <h3 className="text-md font-semibold text-gray-800">{article.title}</h3>
                  <p className="text-sm text-gray-500">
                    {article.updated_at
                      ? `Modified on ${new Date(article.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}`
                      : "N/A"}
                  </p>

                  <Link
                    to={`/category/${article?.categories[0]?.id}/${article?.categories[0]?.name}/${article.id}/${article.title.replace(/\s+/g, '-').toLowerCase()}`}
                    className="text-blue-600 text-sm font-medium hover:underline mt-1 inline-block"
                  >
                    Read More
                  </Link>
                </div>
              </div>

              {/* Right: categories/tags */}
              <div className="flex flex-wrap gap-2">
                {article.categories?.slice(0, 2).map((cat) => (
                  <span
                    key={cat.id}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
                {article.categories?.length > 2 && (
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
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
