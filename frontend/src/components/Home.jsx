import '../Home.css';
import { React, useState } from 'react';

const Home = () => {
    const [isLightOn, setIsLightOn] = useState(true);

    const toggleLight = () => {
        setIsLightOn(!isLightOn);
    };

    return (
        <div className={`heroContainer ${isLightOn ? 'lightOn' : 'lightOff'}`}>
            <div className="content">
                <h1 className="heroTitle">Glowly</h1>
                <p className="heroSubtitle">Connecting People, Inspiring Innovation</p>
            </div>
            <div className="lightbulb-container" onClick={toggleLight}>
                {isLightOn ? (
                    <img 
                        src="/images/lightbulbon.png" 
                        alt="Lightbulb On" 
                        className="lightbulb on"
                    />
                ) : (
                    <img 
                        src="/images/lightbulboff.png" 
                        alt="Lightbulb Off" 
                        className="lightbulb off"
                    />
                )}
            </div>
        </div>
    );
};

export default Home;