import { Link } from 'react-router-dom';
import ArticlesSection from '../components/Articles';
import { fetchCategories, fetchAllPosts, fetchPostsBySearch } from '../services/api.js';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

import icon1 from "../assets/categoryIcons/1.png";
import icon2 from "../assets/categoryIcons/2.png";
import icon3 from "../assets/categoryIcons/3.png";
import icon4 from "../assets/categoryIcons/4.png";
import icon5 from "../assets/categoryIcons/5.png";
import icon6 from "../assets/categoryIcons/6.png";
import icon7 from "../assets/categoryIcons/7.png";
import icon8 from "../assets/categoryIcons/8.png";
import icon9 from "../assets/categoryIcons/9.png";

const icons = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
];
const Home = () => {
  const [cat, setCat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]); // all posts initially
  const [displayedPosts, setDisplayedPosts] = useState([]); // posts to show in ArticlesSection
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

  // Handle search button click
  const handleSearch = async () => {
    if (!searchTerm) {
      // if input is empty, show all posts
      setDisplayedPosts(allPosts);
      return;
    }

    setLoadingSearch(true);
    try {
      const posts = await fetchPostsBySearch(searchTerm);
      // make sure the API returns a `results` array or posts array
      setDisplayedPosts(posts?.results || posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-[#1a3940] text-white pt-24 pb-24 md:pb-36 px-6 flex flex-col items-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-6 text-center">
          Hi, how can we help you?
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-sm sm:max-w-xl">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="flex-grow px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base bg-white rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-[#1A2C40] text-black"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // search on Enter
            />
            <button
              onClick={handleSearch}
              className="cursor-pointer bg-white text-[#1A2C40] px-4 sm:px-6 py-2 sm:py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center"
            >
              <IoSearchSharp className="text-lg sm:text-2xl" />
            </button>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
    <section className="relative -mt-[6%] md:-mt-[3%] px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* First row: 5 cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-5">
          {cat?.slice(0, 5).map((e, index) => (
            <Link
              to={`/category/${e?.id}/${encodeURIComponent(e?.name)}`}
              key={index}
              className="bg-white cursor-pointer rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img src={icons[index]} alt={e?.name} className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold">{e?.name}</h3>
            </Link>
          ))}
        </div>

        {/* Second row: remaining 4 cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-4">
          {cat?.slice(5, 9).map((e, index) => (
            <Link
              to={`/category/${e?.id}/${encodeURIComponent(e?.name)}`}
              key={index + 5} // +5 because this is the second row
              className="bg-white cursor-pointer rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img src={icons[index + 5]} alt={e?.name} className="w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold">{e?.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>


      {/* Article section */}
      <ArticlesSection
        searchTerm={searchTerm}
        posts={displayedPosts}
        loading={loadingSearch}
      />
    </div>
  );
};

export default Home;
