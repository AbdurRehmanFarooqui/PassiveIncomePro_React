import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
    
    return (
        <footer >
            <div className="footer-top">
                <div className="container">
                    <div className="row">

                        <div className="footer-info">
                            <h3>Passive Income Pro</h3>
                            <p>Passive Income Pro is The most popular spot online to earn cash for watching videos.</p>
                        </div>

                        <div className="footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <Link className='link' to='/'>Home</Link>
                                <Link className='link' to='/aboutus'>About us</Link>
                                <Link className='link' to='/contactus'>Contact us</Link>
                                <Link className='link' to='/termsandconditions'>Terms and Conditions</Link>
                                <Link className='link' to='/privacypolicy'>Privacy policy</Link>
                            </ul>
                        </div>




                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="copyright">
                    © Copyright <strong>PASSIVE INCOME PRO</strong>. All Rights Reserved
                </div>
            </div>
        </footer>
        // </div>
    )
}

export default Footer