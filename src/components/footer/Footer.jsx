import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import './Footer.css';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../assets/cinema-icon.png';

export default function Footer() {
    return (
        <footer className='footer'>
            <ContentWrapper>
                <div className="logo">
                    <img src={logo} alt="" />
                    <h1>CinemaSagom</h1>
                </div>
                <ul className="menuItems">
                    <li className="item">Terms Of Use</li>
                    <li className="item">Privacy-Policy</li>
                    <li className="item">About</li>
                    <li className="item">Blog</li>
                    <li className="item">FAQ</li>
                </ul>
                <div className="infoText">
                    <div>
                        This product uses the TMDB API but is not endorsed or certified by
                        <Link to={'https://www.themoviedb.org'}><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="" /></Link>
                        .
                    </div>
                    
                </div>
                <div className="socialIcons">
                    <Link to={'https://www.instagram.com/edgarsagom/'} className="icons"> <FaInstagram className='icon'/> </Link>
                    <Link to={'https://twitter.com/SagomEdgar'} className="icons"> <FaXTwitter className='icon'/> </Link>
                    <Link to={'https://github.com/EdgarSagom'} className="icons"> <FaGithub className='icon'/> </Link>
                </div>
            </ContentWrapper>
        </footer>
    );
};
