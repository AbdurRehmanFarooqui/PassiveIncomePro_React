import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import logo from '../items/logo.png';
// import logo from '../images/logo.png'
const Navbar = () => {
    const location = useLocation()
    // console.log(location.pathname)
    // console.log(location)
    const navigate = useNavigate()
    const [navBg, setNavBg] = useState(false);
    // const isHome = props.name === 'Homepage' ? true : false;

    const changeNavBg = () => {
        window.scrollY >= 200 ? setNavBg(true) : setNavBg(false);
    }
    useEffect(() => {
        window.addEventListener('scroll', changeNavBg);
        return () => {
            window.removeEventListener('scroll', changeNavBg);
        }

        // eslint-disable-next-line
    }, [sessionStorage.getItem('PIP-user')])

    useEffect(() => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, [location])

    const [style, setStyle] = useState("hide")
    const [menu, setMenu] = useState("bars")

    const displayMobileMenu = () => {
        if (style !== "hide") {
            setStyle("hide");
            setMenu("bars");
        }
        else {
            setStyle("show");
            setMenu("close");
        }
    }

    return (
        <>
            <header id='header' >
                <nav className='navbar' style={navBg ? { height: "60px" } : {}}>
                    {/* <Link className='logo' to='/'>Passive Income Pro</Link> */}
                    <img src={logo} id='logo' alt="Passive Income Pro" />
                    <ul>
                        <Link className={`link ${location.pathname === '/' ? 'active' : ''} `} to='/'>Home</Link>

                        {!sessionStorage.getItem('PIP-user') ?
                            <Link className={`link ${location.pathname === '/signup' ? 'active' : ''} `} to='/signup'>Sign up</Link> : <></>}

                        {!sessionStorage.getItem('PIP-user') ?
                            <Link className={`link ${location.pathname === '/login' ? 'active' : ''} `} to='/login'>Log in</Link> : <></>}

                        {!sessionStorage.getItem('PIP-user') ?
                            <Link className={`link ${location.pathname === '/aboutus' ? 'active' : ''} `} to='/aboutus'>About us</Link> : <></>}

                        {sessionStorage.getItem('PIP-user') ?
                            <Link className={`link ${location.pathname === '/profile' ? 'active' : ''} `} to='/profile'>Profile</Link> : <></>}

                        {sessionStorage.getItem('PIP-user') ?
                            <span onClick={() => {
                                sessionStorage.clear()
                                navigate('/login')
                            }} className={`link cursor-pointer but`}>Logout</span> : <></>}

                        <div className="mobile-menu" onClick={displayMobileMenu}>
                            <i style={{ padding: "0px" }} className={`menu fa fa-${menu}`}></i>
                            {/* <i style={{ padding: "0px" }} className="fa fa-bars"></i> */}
                        </div>

                    </ul>
                </nav>
            </header>
            <div className={`modal-container ${style}`}>
                <Link className={`link ${location.pathname === '/' ? 'active' : ''} `} to='/'>Home</Link>

                {!sessionStorage.getItem('PIP-user') ?
                    <Link className={`link ${location.pathname === '/signup' ? 'active' : ''} `} to='/signup'>Sign up</Link> : <></>}

                {!sessionStorage.getItem('PIP-user') ?
                    <Link className={`link ${location.pathname === '/login' ? 'active' : ''} `} to='/login'>Log in</Link> : <></>}

                {!sessionStorage.getItem('PIP-user') ?
                    <Link className={`link ${location.pathname === '/aboutus' ? 'active' : ''} `} to='/aboutus'>About us</Link> : <></>}

                {sessionStorage.getItem('PIP-user') ?
                    <Link className={`link ${location.pathname === '/profile' ? 'active' : ''} `} to='/profile'>Profile</Link> : <></>}

                {sessionStorage.getItem('PIP-user') ?
                    <span onClick={() => {
                        sessionStorage.clear()
                        navigate('/login')
                    }} className={`link cursor-pointer but`}>Logout</span> : <></>}
            </div>
        </>

    )
}

export default Navbar