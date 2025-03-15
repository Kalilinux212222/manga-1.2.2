import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Use FaArrowLeft and FaArrowRight
import { Link } from 'react-router-dom'; // Import Link
import { useEffect } from "react"; // Import the manga data
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import '../index.css';
import allMangaDb from '../MangaDB/allManga'
import { FaFire } from "react-icons/fa";

import { MdRecommend } from "react-icons/md";

const Card = ({ image, title }) => (
    <div className="card sm:w-[200px] sm:h-[330px] lg:w-[200px] lg:h-[330px] w-[100px] h-[200px]  rounded-xl bg-white drop-shadow-lg m-3 mx-2 font-bold text-center text-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
        <img className="drop-shadow-lg mx-auto mt-2 w-[90%] " src={image} alt={title} />
        <p className="flex items-center justify-center mt-2 pt-1 text-sm">
            {title} 
        </p>
    </div>
);

const Newest = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Optional: Save the user's preference in localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode);
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };

    const [search, setSearch] = useState("");
    const [filteredResults, setFilteredResults] = useState(allMangaDb);
    const [more, setMore] = useState(false);
    const [moreOne, setMoreOne] = useState(false);
    

    const[drop,setDrop] = useState(false)
    const dropdown = () => {
        setDrop(!drop)
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
    };

    // Debounce search input
    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            const results = allMangaDb.filter(item =>
                item.searchKey.toLowerCase().trim().includes(search.toLowerCase())
            );
            setFilteredResults(results);
        }, 300); // Adjust 300ms as needed

        return () => clearTimeout(debounceSearch);
    }, [search]);

    const handleMoreToggle = () => {
        setMore(!more);
    };

    const handleMoreOneToggle = () => {
        setMoreOne(!moreOne);
    };

    return (
        <>
            <header className="text-black flex w-full items-center justify-between text-center mx-auto bg-gray-100 ">
                <div onClick={handleNav} className="p-4 block md:hidden">
                    {nav ? <AiOutlineClose className="icon" size={20} /> : <AiOutlineMenu className="icon" size={20} />}
                </div>
                <nav className="mx-4 max-w-[400px] h-full overflow-x-scroll ">
                    <ul className="p-4 mx-auto hidden md:flex ">
                        <li className="p-4"><Link to="/">Home</Link></li>
                        <li className="p-4"><Link to='/newest'>News</Link></li>
                        <li className="p-4"><Link to="/col">Collections</Link></li>
                        <li className="p-4">
                            <Link to="/RegistrationForm">Register</Link> {/* Link to Login */}
                        </li>
                        <li className="p-4">Resources</li>
                        <li className="p-4">Payment</li>
                        <li className="p-4"><Link to="/popular">Popular</Link></li>
                        <li className="p-4">Favourites</li>
                    </ul>
                </nav>
                <h2 className="flex md:text-3xl text-3xl font-bold p-4 mx-auto ">Mobibeezz</h2>
                <div class="InputContainer">
                    <input onChange={handleSearch} value={search} placeholder="Search.." id="input" class="input" name="text" type="text"/>
                </div>
            
                
                <label className="switch mx-2">
                    <input className="dkmod" type="checkbox" value={isDarkMode} onChange={toggleTheme} />
                    <span className="slider"></span>
                </label>
                
                {/* Mobile Navigation */}
                {nav && (
                    <div className="text-white fixed items-center z-1 w-sm h-full right-0 top-0 border-r border-r-gray-900 bg-gray-700 ease-in-out duration-600 lg:hidden ">
                        <nav className="">
                            <h2 className="flex md:text-3xl text-3xl font-bold p-4 mx-24 text-gray-300 border-b ">Mobibeezz</h2>
                            <ul className="mx-auto pt-4">
                                <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><Link to="/">Home</Link></li>
                                <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><Link to='/newest'>News</Link></li>
                                <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><Link to="/col">Collections</Link></li>
                                
                                <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400">Series</li>
                                <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><Link to="/popular">Popular</Link></li>
                                <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400">
                                    <Link to="/RegistrationForm">Register</Link> {/* Link to Login */}
                                </li>
                            </ul>
                        </nav>    
                    </div>
                )}
            </header>
            <section className="w-full h-auto"> 
                <div className="flex w-full h-[100%] items-center justify-center mx-auto p-4">
                    <ul className="flex mx-4 font-bold border-b">
                        <li className="p-4 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/popular">Popular</Link></li>
                        <li className="p-4 bg-sky-300 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/newest">Newest</Link></li>
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
            
            <div className="flex overflow-x-auto ">
            
                {filteredResults.length > 0 ? (
                    <div className="flex  justify-center mx-auto w-auto items-center text-center">
                        {filteredResults.map(item => (
                                <div key={item.id} className="flex flex-wrap mx-auto drop-shadow-2xl m-4 justify-center ease-in-out duration-300">                                
                                    <Card image={item.image} title={item.title} />
                                </div>
                        ))}
                    </div>
                ) : (
                    
                        <p className="flex font-bold text-2xl justify-center p-4">No results found</p>
                    
                )}
            </div>

            {/* Popular Section */}
            <div>
                <h2 className="flex items-center font-bold text-2xl p-4">Newest - <FaFire  className="mx-2 icon" size={20} color="black" /></h2>
            </div>
            
            <div className="flex mx-auto flex-wrap drop-shadow-2xl m-4 justify-center ease-in-out duration-300">
                {allMangaDb.slice(0, more ? allMangaDb.length : 6).map((item, index) => (
                    <Card key={index} image={item.image} title={item.title} stars={item.stars} />
                ))}
            </div>

            <div className="flex justify-center">
                <button onClick={handleMoreToggle} className="flex items-center bg-sky-300 px-4 py-2 rounded-2xl hover:bg-sky-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300 active:bg-sky-500">
                    <FaArrowLeft className="mx-2 icon" size={20} /> Less
                </button>
                <button onClick={handleMoreToggle} className="flex mx-4 items-center bg-sky-300 px-4 py-2 rounded-2xl hover:bg-sky-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300 active:bg-sky-500">
                    More <FaArrowRight className="icon mx-2" size={20} />
                </button>
            </div>

            {/* Latest Section */}
            <section className="w-full h-full mt-3 ">
                <div>
                    <h2 className="flex items-center font-bold text-2xl p-4">Recommended For You - <MdRecommend className="mx-2 icon" size={30} color="black" /></h2>
                </div>
                <div className="flex mx-auto overflow-x-auto flex-wrap drop-shadow-2xl m-4 justify-center ease-in-out duration-300">
                    {allMangaDb.slice(0, moreOne ? allMangaDb.length : 6).map((item, index) => (
                        <Card key={index} image={item.image} title={item.title} stars={item.stars} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <button onClick={handleMoreOneToggle} className="flex items-center bg-sky-300 px-4 py-2 rounded-2xl hover:bg-sky-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300 active:bg-sky-500">
                        <FaArrowLeft className="mx-2 icon" size={20} /> Less
                    </button>
                    <button onClick={handleMoreOneToggle} className="flex mx-4 items-center bg-sky-300 px-4 py-2 rounded-2xl hover:bg-sky-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-300 active:bg-sky-500">
                        More <FaArrowRight className="mx-2 icon" size={20} />
                    </button>
                </div>
            </section>
        </>
    );
};

export default Newest;