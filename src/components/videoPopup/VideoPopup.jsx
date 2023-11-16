import React from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import ReactPlayer from 'react-player/youtube';

import './VideoPopup.css';

export default function VideoPopup({ show, setShow, videoId, setVideoId }) {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };

    return (
        <div className={`videoPopup ${show ? 'visible' : ''}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <VscChromeClose className='closeBtn' onClick={hidePopup} />
                <ReactPlayer 
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width='100%'
                    height='100%'
                    playing={true}
                />
            </div>
        </div>
    )
}
