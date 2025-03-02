import '../Home.css';
import { React, useState } from 'react';

const Home = () => {
    const [isLightOn, setIsLightOn] = useState(true);

    const toggleLight = () => {
        setIsLightOn(!isLightOn);
    };

    return (
        <div className={`pageWrapper ${isLightOn ? 'lightOn' : 'lightOff'}`}>
            {/* Hero Section */}
            <section className="heroSection" id="home">
                <div className="heroContent">
                    <h1 className="heroTitle">Glowly</h1>
                    <p className="heroSubtitle">Connecting People, Inspiring Innovation</p>
                    <a href="/create-post" className="ctaButton">Post Something!</a>
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
            </section>

            {/* Features Section */}
            <section className="featuresSection" id="features">
                <h2 className="sectionTitle">Our Features</h2>
                <div className="featuresGrid">
                    <div className="featureCard">
                        <div className="featureIcon">💡</div>
                        <h3>Create Posts</h3>
                        <p>Users can share their experiences, fostering discussion and engagement.</p>
                    </div>
                    <div className="featureCard">
                        <div className="featureIcon">🗺️</div>
                        <h3>Map Search</h3>
                        <p>Encourages real-world meetups</p>
                    </div>
                    <div className="featureCard">
                        <div className="featureIcon">🤖</div>
                        <h3>AI-Powered Search</h3>
                        <p>Finds relevant topics and discussions efficiently.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="aboutSection" id="about">
                <div className="aboutContent">
                    <h2 className="sectionTitle">About Glowly</h2>
                    <p>
                        Founded in 2025, Glowly has been at the forefront of innovative solutions for businesses worldwide. 
                        Our mission is to illuminate possibilities and connect people through seamless technology.
                    </p>
                    <p>
                        With a team of passionate experts, we continually push the boundaries of what's possible, 
                        bringing light to complex problems and creating intuitive solutions that make a difference.
                    </p>
                </div>
                <div className="aboutImage">
                    <img 
                        src="/images/background.png" 
                        alt="Glowly" 
                        className="aboutImg"
                    />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonialsSection" id="testimonials">
                <h2 className="sectionTitle">What Our Users Say</h2>
                <div className="testimonialCards">
                    <div className="testimonialCard">
                        <p className="testimonialText">"Glowly was incredibly helpful and gave me a huge confidence boost. I feel so much more assured and prepared than I did before!"</p>
                        <p className="testimonialAuthor">— Samar K. , Artist</p>
                    </div>
                    <div className="testimonialCard">
                        <p className="testimonialText">"“This app has helped me become so much more social able, and has help my anxiety subside. 10/10 would recommend”"</p>
                        <p className="testimonialAuthor">— Queenie Y. , DECA competitor</p>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="footer">
                <div className="footerContent">
                    <div className="footerLogo">
                        <h3>Glowly</h3>
                    </div>
                    <div className="footerLinks">
                        <div className="footerLinkColumn">
                            <h4>Company</h4>
                            <a href="#about">About Us</a>
                        </div>
                        <div className="footerLinkColumn">
                            <h4>Resources</h4>
                            <a href="/support">Support</a>
                        </div>
                        <div className="footerLinkColumn">
                            <h4>Legal</h4>
                            <a href="/about">Privacy Policy</a>
                            <a href="/about">Terms of Service</a>
                        </div>
                    </div>
                </div>
                <div className="footerBottom">
                    <p>&copy; 2025 Glowly. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;