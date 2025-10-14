import { Link } from 'react-router-dom';
import ArticlesSection from '../components/Articles';
import { fetchCategories, fetchAllPosts, fetchPostsBySearch } from '../services/api.js';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import './home.css';
import icon1 from "../assets/categoryIcons/1.png";
import icon2 from "../assets/categoryIcons/2.png";
import icon3 from "../assets/categoryIcons/3.png";
import icon4 from "../assets/categoryIcons/4.png";
import icon5 from "../assets/categoryIcons/5.png";
import icon6 from "../assets/categoryIcons/6.png";
import icon7 from "../assets/categoryIcons/7.png";
import icon8 from "../assets/categoryIcons/8.png";
import icon9 from "../assets/categoryIcons/9.png";

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9];

const Home = () => {
  const [cat, setCat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetchCategories()
      .then(data => setCat(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch all posts on page load
  useEffect(() => {
    fetchAllPosts()
      .then(data => {
        setAllPosts(data?.results || []);
        setDisplayedPosts(data?.results || []);
      })
      .catch(err => console.error(err));
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setDisplayedPosts(allPosts);
      return;
    }

    setLoadingSearch(true);
    try {
      const posts = await fetchPostsBySearch(searchTerm);
      setDisplayedPosts(posts?.results || posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    setDisplayedPosts(allPosts);
  };

  return (
    <div className="help-center">
      {/* Hero Section */}
      <section className="hero-section-center">
        <h1 className="hero-title">Hi, how can we help you?</h1>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            
            {/* Show clear button when text is entered */}
            {searchTerm && (
              <button className="clear-btn" onClick={handleClearSearch}>
                <IoClose className="clear-icon" />
              </button>
            )}

            <button onClick={handleSearch}>
              <IoSearchSharp className="search-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Category Section — hidden during search */}
      {!searchTerm && (
        <section className="category-section">
          <div className="category-grid five-cols">
            {cat?.slice(0, 5).map((e, index) => (
              <Link to={`/category/${e?.id}/${encodeURIComponent(e?.name)}`} key={index} className="category-card">
                <img src={icons[index]} alt={e?.name} />
                <h3>{e?.name}</h3>
              </Link>
            ))}
          </div>

          <div className="category-grid four-cols">
            {cat?.slice(5, 9).map((e, index) => (
              <Link to={`/category/${e?.id}/${encodeURIComponent(e?.name)}`} key={index + 5} className="category-card">
                <img src={icons[index + 5]} alt={e?.name} />
                <h3>{e?.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Section */}
      <ArticlesSection searchTerm={searchTerm} posts={displayedPosts} loading={loadingSearch} />
    </div>
  );
};

export default Home;
