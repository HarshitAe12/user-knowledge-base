import React from 'react';
import logo from '../assets/logo.webp';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate=useNavigate()
    return (
        <header className="bg-white px-6 py-4 flex justify-between items-center ">
            {/* Left: Home Button */}

            <img src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/8gxGtPEVqtv0pHte3WSh/media/68da47adf00445478b6d27e4.png" alt="Logo" className="h-10 w-[150px] object-contain" />
            {/* Right: Logo */}
            <button onClick={()=>navigate("/")} className="bg-[#1A2C40] cursor-pointer text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition">
                Home
            </button>

        </header>
    );
};

export default Header;
