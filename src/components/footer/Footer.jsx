import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, aspernatur optio. Laborum, dicta doloremque ipsum delectus quaerat vero cumque quo dolorum nihil commodi, dignissimos eveniet quasi quam error debitis officia.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaXTwitter />
                    </span>
                    <span className="icon">
                        <FaGithub />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};
