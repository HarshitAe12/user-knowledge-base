import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FaRegFileAlt } from 'react-icons/fa';
import { fetchPostsByCategory } from '../services/api';
import './style.css'


const Category = () => {
    const { id, name } = useParams();
    console.log("ds", id, name)
    const [posts, setPosts] = useState([]);
    console.log("post", posts)
    useEffect(() => {
        if (id) {
            fetchPostsByCategory(id)
                .then((data) => setPosts(data))
                .catch((err) => console.error(err));
        }
    }, [id]);


    return (
        <div className="category-page">
      {/* Hero Section */}
      <section className="category-hero">
        <h1 className="category-title">Knowledge Base</h1>
        <p className="category-name" style={{color:"white"}}>{name || ""}</p>
      </section>

      {/* Articles Section */}
      <section className="category-articles">
        <div className="articles-box">
          <h2 className="articles-heading">Articles in {name}</h2>

          <div className="articles-list" style={{maxHeight:"100%"}}>
            {posts?.length > 0 ? (
              posts.map((article, idx) => (
                <Link
                  key={idx}
                  className="article-link"
                  to={`/category/${id}/${name}/${article.id}/${article.title
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {/* Icon */}
                  <div className="article-icon">
                    <FaRegFileAlt className="article-icon-inner" />
                  </div>

                  {/* Texts */}
                  <div>
                    <p className="article-title">{article.title}</p>
                    <p className="article-date">
                      Modified on{" "}
                      {new Date(article.updated_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-articles">No articles found in this category.</p>
            )}
          </div>
        </div>
      </section>
    </div>
    )
}

export default Category
