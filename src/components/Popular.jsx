import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import "../index.css";
import allMangaDb from "../MangaDB/allManga";
import { FaFire } from "react-icons/fa";
import { MdRecommend } from "react-icons/md";

const Card = ({ image, title }) => (
  <div className="card w-[100px] h-[200px] sm:w-[150px] sm:h-[250px] md:w-[180px] md:h-[300px] lg:w-[200px] lg:h-[330px] rounded-xl bg-white drop-shadow-lg m-2 font-bold text-center text-sm sm:text-md transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
    <img
      className="drop-shadow-lg mx-auto mt-2 w-[90%] h-[70%] object-cover"
      src={image}
      alt={title}
    />
    <p className="flex items-center justify-center mt-1 sm:mt-2 pt-1 text-xs sm:text-sm truncate">
      {title}
    </p>
  </div>
);

const Popular = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState(allMangaDb);
  const [more, setMore] = useState(false);
  const [moreOne, setMoreOne] = useState(false);
  const [drop, setDrop] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);
  const handleNav = () => setNav(!nav);
  const dropdown = () => setDrop(!drop);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const handleMoreToggle = () => setMore(!more);
  const handleMoreOneToggle = () => setMoreOne(!moreOne);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      const results = allMangaDb.filter((item) =>
        item.searchKey.toLowerCase().trim().includes(search.toLowerCase())
      );
      setFilteredResults(results);
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [search]);

  return (
    <>
      <header className="text-black flex w-full items-center justify-between bg-gray-100 py-2 px-2 sm:px-4">
        <div onClick={handleNav} className="p-2 sm:p-4 block md:hidden">
          {nav ? (
            <AiOutlineClose className="icon" size={20} />
          ) : (
            <AiOutlineMenu className="icon" size={20} />
          )}
        </div>
        <nav className="hidden md:flex mx-2 sm:mx-4 max-w-[400px] overflow-x-auto">
          <ul className="flex p-4 sm:p-4 space-x-2 sm:space-x-4 text-sm sm:text-base">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/newest">News</Link></li>
            <li><Link to="/col">Collections</Link></li>
            <li><Link to="/RegistrationForm">Register</Link></li>
            <li>Resources</li>
            <li>Payment</li>
            <li><Link to="/popular">Popular</Link></li>
            <li>Favourites</li>
          </ul>
        </nav>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold p-2 sm:p-4 mx-auto">
          Mobibeezz
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-4 pr-2 sm:pr-4">
          <FaSearch className="cursor-pointer" size={20} onClick={toggleSearch} />
          <label className="switch">
            <input
              className="dkmod"
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Mobile Navigation */}
        {nav && (
          <div className="fixed z-10 w-[70%] max-w-[250px] h-full right-0 top-0 bg-gray-700 text-white border-r border-gray-900 ease-in-out duration-500 md:hidden">
            <nav>
              <h2 className="text-2xl font-bold p-4 mx-4 text-gray-300 border-b">
                Mobibeezz
              </h2>
              <ul className="pt-4 space-y-2">
                {[
                  { to: "/", label: "Home" },
                  { to: "/newest", label: "News" },
                  { to: "/col", label: "Collections" },
                  { label: "Series" },
                  { to: "/popular", label: "Popular" },
                  { to: "/RegistrationForm", label: "Register" },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-500 p-4 rounded-2xl hover:bg-gray-300 active:bg-gray-400"
                  >
                    {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="w-full bg-transparent my-2 p-2">
          <div className="InputContainer max-w-[400px]  mx-auto">
            <input
              onChange={handleSearch}
              value={search}
              placeholder="Search..."
              className="input w-full p-2 text-sm sm:text-base border rounded focus:outline-none"
              type="text"
            />
          </div>
        </div>
      )}

      <section className="w-full h-auto"> 
            <div className="flex w-full h-[100%] items-center justify-center mx-auto p-4">
                <ul className="flex mx-4 font-bold border-b">
                    <li className="p-4 bg-sky-300 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/popular">Popular</Link></li>
                    <li className="p-4 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/newest">Newest</Link></li>
                    <li className=" p-4 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/col">Collections</Link></li>
                    <li className=" p-4 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl flex ease-in-out duration-500" onClick={dropdown} >Series {!drop ? <IoMdArrowDropright size={20} className="mt-0.5" /> :<IoMdArrowDropleft size={20} className="mt-0.5"/>}</li>
                </ul>
                {drop ? <div className="flex">
                        <ul className="mx-[-20px]">
                            <li className="text-[13px] md:text-[1rem] py-1 md:py-2  font-bold hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl mx-[10px]">Demographic</li>
                            <li className="text-[13px] md:text-[1rem] py-1 md:py-2 font-bold  hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl mx-[10px]">Genre</li>
                        </ul>
                    </div> : <div className="hidden"></div>
                }
            </div>
                      
        </section>

      <div className="flex overflow-x-auto justify-center p-2 sm:p-4">
        {filteredResults.length > 0 ? (
          <div className="flex justify-center gap-2 sm:gap-4">
            {filteredResults.map((item) => (
              <Card key={item.id} image={item.image} title={item.title} />
            ))}
          </div>
        ) : (
          <p className="font-bold text-lg sm:text-2xl p-4">No results found</p>
        )}
      </div>

      {/* Popular Section */}
      <section className="w-full">
        <h2 className="flex items-center font-bold text-lg sm:text-2xl p-2 sm:p-4">
          Newest - <FaFire className="mx-2 icon" size={20} color="black" />
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-4">
          {allMangaDb.slice(0, more ? allMangaDb.length : 6).map((item, index) => (
            <Card key={index} image={item.image} title={item.title} />
          ))}
        </div>
        <div className="flex justify-center gap-2 sm:gap-4 p-2 sm:p-4">
          <button
            onClick={handleMoreToggle}
            className="flex items-center bg-sky-300 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl hover:bg-sky-400 active:bg-sky-500 text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-1 sm:mr-2" size={16} /> Less
          </button>
          <button
            onClick={handleMoreToggle}
            className="flex items-center bg-sky-300 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl hover:bg-sky-400 active:bg-sky-500 text-sm sm:text-base"
          >
            More <FaArrowRight className="ml-1 sm:ml-2" size={16} />
          </button>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="w-full">
        <h2 className="flex items-center font-bold text-lg sm:text-2xl p-2 sm:p-4">
          Recommended For You -{" "}
          <MdRecommend className="mx-2 icon" size={24} color="black" />
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-4">
          {allMangaDb.slice(0, moreOne ? allMangaDb.length : 6).map((item, index) => (
            <Card key={index} image={item.image} title={item.title} />
          ))}
        </div>
        <div className="flex justify-center gap-2 sm:gap-4 p-2 sm:p-4">
          <button
            onClick={handleMoreOneToggle}
            className="flex items-center bg-sky-300 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl hover:bg-sky-400 active:bg-sky-500 text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-1 sm:mr-2" size={16} /> Less
          </button>
          <button
            onClick={handleMoreOneToggle}
            className="flex items-center bg-sky-300 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl hover:bg-sky-400 active:bg-sky-500 text-sm sm:text-base"
          >
            More <FaArrowRight className="ml-1 sm:ml-2" size={16} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Popular;