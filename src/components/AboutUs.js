import React, { useEffect, useState } from 'react';
import aboutImg from '../items/about.jpg';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AboutUs = () => {
    const location = useLocation();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(false);
        setTimeout(() => {
            setAnimate(true);
        }, 50);
    }, [location]);

    useEffect(() => {
        // Find all divs with the class 'add'
        const adDivs = document.querySelectorAll('.add');

        adDivs.forEach((adDiv) => {
            if (adDiv) {
                // Create the ad INS element
                const ins = document.createElement('ins');
                ins.className = "adsbygoogle";
                ins.style = "display:block";
                ins.setAttribute('data-ad-client', 'ca-pub-7308964303112512');
                ins.setAttribute('data-ad-slot', '8574369523');
                ins.setAttribute('data-ad-format', 'auto');
                ins.setAttribute('data-full-width-responsive', 'true');

                // Append the ad INS element to the div
                adDiv.appendChild(ins);

                // Create the script tag
                const script = document.createElement('script');
                script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
                script.async = true;
                script.setAttribute('data-ad-client', 'ca-pub-7308964303112512');
                script.crossOrigin = "anonymous";

                // Append the script to the div
                adDiv.appendChild(script);

                // Push adsbygoogle to load the ad
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        });
    }, []);

    return (
        <>
            <main className='about-us for-add'>
                <div className='add'>
                    {/* Ad will be injected here */}
                </div>

                <div>
                    <div className="container2">
                        <h2>{location.pathname === '/aboutus' ? 'About Us' : 'Contact Us'}</h2>

                        {animate && <motion.div className="row m-column"
                            initial={{ y: 300, opacity: 0 }}
                            animate={{
                                y: 0, opacity: [0.1, 0.2, 1]
                            }}
                            transition={{
                                duration: 1,
                                times: [0, 0.9, 1],
                                type: 'spring'
                            }}
                        >
                            <div className="img-div">
                                <img src={aboutImg} className="img-fluid" alt="" />
                            </div>
                            <div className="info-div" >
                                {location.pathname === '/aboutus' ? <>
                                    <h4>Welcome to Passive Income Pro</h4>
                                    <p>
                                        At Passive Income Pro, we are dedicated to empowering individuals with the tools and resources needed to achieve financial independence and generate passive income streams. Our mission is to provide innovative solutions and unparalleled support to help you maximize your earning potential and build a sustainable income.
                                    </p>
                                </> : <>
                                    <h4><span style={{ color: "#007BFF" }}><strong>Customer Support</strong></span></h4>
                                    <h4>What can we help you with?</h4>
                                    <p><b>
                                        Passive Income Pro is here to provide you with more information, and create an effective solution for your needs.
                                    </b> </p>
                                    <h5>Email us at:
                                        <span style={{ color: "#007bff" }}> passiveincomepro@gmail.com</span></h5>
                                </>}
                            </div>
                        </motion.div>}
                    </div>

                    {location.pathname === '/aboutus' && <div className="container2 detail">
                        <div>
                            <h4>Who We Are </h4>
                            <p>Passive Income Pro is a leading provider of financial empowerment solutions, designed for individuals seeking to explore and enhance passive income opportunities. With a team of experienced professionals and industry experts, we offer a range of packages tailored to meet diverse needs and goals. Our approach combines cutting-edge technology with practical strategies to deliver real results.</p>

                            <h4>Our Vision</h4>
                            <p>Our vision is to be the foremost platform for individuals who aspire to achieve financial freedom through passive income. We believe that with the right tools, knowledge, and support, anyone can create a reliable income source and unlock new possibilities for personal and financial growth.</p>

                            <h4>Our Services</h4>
                            <p>We offer a variety of packages, each designed to cater to different levels of experience and financial goals:
                                <br /><br />
                                <b>Package 1:</b> Free Account – Ideal for newcomers, offering basic access to our tools and resources, and the opportunity to earn up to PKR 109,900.<br /><br />
                                <b>Package 2:</b> Basic Registration – Available for a nominal fee, providing additional features and the potential to earn up to PKR 40,000.
                                <br /><br />
                                <b>Package 3:</b> Premium Registration – Our top-tier package with extensive benefits, allowing for earnings up to PKR 20,000.</p>

                            <h4>Our Commitment</h4>
                            <p>At Passive Income Pro, we are committed to transparency, integrity, and excellence. We prioritize your success and strive to provide exceptional customer service and support. Our dedicated team is here to guide you through every step of your journey, from registration to payout, ensuring a smooth and rewarding experience.</p>

                            <h4>Get Started Today</h4>
                            <p>Join the Passive Income Pro community and start your journey towards financial freedom. Explore our packages, take advantage of our resources, and connect with us for personalized support. Together, we can turn your passive income aspirations into reality.</p>

                            <h4>Contact Us</h4>
                            <p>For more information, inquiries, or support, please reach out to us at: <span style={{ color: "#007bff" }}> passiveincomepro@gmail.com</span></p>
                        </div>
                    </div>}
                </div>

                <div className='add '></div>
            </main>

            {location.pathname === '/aboutus' ? <>
                <section id="portfolio" style={{ zIndex: 1 }}>
                    <div className="container">
                        <header className="section-header">
                            <h3 className="section-title">Are you ready to start earning from Passive Income Pro ?</h3>
                        </header>
                        <center>
                            <Link className="strat1" to='/signup'>Get Started</Link>
                        </center>
                    </div>
                </section>
            </> : <></>}
        </>
    );
};

export default AboutUs;
