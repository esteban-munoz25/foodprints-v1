import React from 'react';
import Logo from '../assets/WFPnewlogo_espan╠âol_standard_White_RGB.svg'; 
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
    const pathname = useLocation();

    return (
        <header className="fixed top-0 left-0 w-full pt-[1.75rem] lg:pt-[2.25rem] xl:pt-[3.25rem] px-44 z-50">
            <div className="logo-container">
                <Link to="/">
                <img src={Logo} alt="WFP Logo" className="h-[79px]" />
                </Link>
            </div>
        </header>
    );
}


export default Header;