import { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';

import './ScrollButton.css';

export default function ScrollButton() {
    const [showTopBottom, setShowTopBottom] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBottom(true);
            } else {
                setShowTopBottom(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className='topBottom'>
            {''}
            {showTopBottom && (
                <FaAngleUp
                    className='icon-position icon-style'
                    onClick={goToTop}
                />
            )}
        </div>
    );
};
