import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import video from '../items/homeAnimation.mp4'
import Alert from './Alert'
import Videobox from './Videobox';
const Home = () => {

    const [inputUrl, setInputUrl] = useState('');
    const [embedUrl, setEmbedUrl] = useState('');
    const [videoState, setVideoState] = useState('');
    const playerRef = useRef(null);
    const playerInstanceRef = useRef(null);
    // const [remainingTime, setRemainingTime] = useState(120); // Start from 120 seconds (2 minutes)
    const [remainingTime, setRemainingTime] = useState(120); // Start from 120 seconds (2 minutes)
    const timerIntervalRef = useRef(null);
    const [count, setCount] = useState("0");
    const [timerDuration, setTimerDuration] = useState(120);
    // const [videoId1, setVideoId] = useState()
    const [video_category, setVideo_category] = useState(0)
    const [newVideoCategory, setNewVideoCategory] = useState(0)
    const host = process.env.REACT_APP_HOST;
    // var videoId;
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('Wrong Credentials')

    const [videos, setVideos] = useState([])

    // const onChange = (event) => {
    //     const url = event.target.value;
    //     setInputUrl(url);
    // };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (sessionStorage.getItem('new-account')) {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
                sessionStorage.removeItem('new-account')
            }, 15000);
        }
        // sessionStorage.setItem('new-account', true)
    }, [])
    const videoIdRef = useRef(null); // Use useRef to store videoId persistently
    const convertToEmbedUrl = useCallback((url) => {
        const watchUrlRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\s]+)/;
        const shortUrlRegex = /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\s]+)/;
        const embedUrlRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\s]+)/;



        // If it's a regular YouTube URL (watch link)
        if (watchUrlRegex.test(url)) {
            videoIdRef.current = url.match(watchUrlRegex)[1]; // Use ref to store videoId
        }
        // If it's a shortened YouTube URL
        else if (shortUrlRegex.test(url)) {
            videoIdRef.current = url.match(shortUrlRegex)[1]; // Use ref to store videoId
        }
        // If it's already an embed URL
        else if (embedUrlRegex.test(url)) {
            videoIdRef.current = url.match(embedUrlRegex)[1]; // Use ref to store videoId
            return url; // Return the embed URL as-is
        }

        // Convert to embed URL if a videoId was found
        if (videoIdRef.current) {
            const embedUrl = `https://www.youtube.com/embed/${videoIdRef.current}`;
            console.log('Converted embedUrl:', embedUrl); // Debug line
            return embedUrl;
        }

        console.error('Invalid URL format');
        return ''; // Return an empty string if the URL is invalid
    }, [])


    const sendApiCall = useCallback(async () => {
        try {
            console.log('send api');
            const response = await fetch(`${host}/user/update/balance`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${sessionStorage.getItem('PIP-user')}`
                },
                body: JSON.stringify({ video_category: video_category })
            });
            console.log(response)
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error('Error during API call:', error);
        }
    }, [video_category, host]);

    const startTimer = useCallback(() => {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime === 1) {  // Check if 1 second is left
                    sendApiCall();
                    return timerDuration
                }
                return prevTime - 1;
            });
        }, 1000);
    }, [sendApiCall, timerDuration]);

    const stopTimer = useCallback(() => {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
    }, []);

    const onPlayerStateChange = useCallback((event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            setVideoState('Playing');
            startTimer();
        } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            setVideoState(event.data === window.YT.PlayerState.PAUSED ? 'Paused' : 'Ended');
            stopTimer();
        } else {
            setVideoState('');
        }
    }, [startTimer, stopTimer]); // Using useCallback to memoize the function

    useEffect(() => {
        try {
            setCount("0");
            const initializePlayer = () => {
                if (playerInstanceRef.current) {
                    playerInstanceRef.current.loadVideoByUrl(embedUrl);
                } else {
                    const videoId = embedUrl && typeof embedUrl === 'string' ? embedUrl.split('/embed/')[1] : null;

                    if (videoId) {
                        playerInstanceRef.current = new window.YT.Player(playerRef.current, {
                            height: '360',
                            width: '640',
                            playerVars: {
                                autoplay: 0,
                                controls: 1,
                                showinfo: 1,
                                rel: 0,
                                iv_load_policy: 3,
                                cc_load_policy: 0,
                                fs: 0,
                                disablekb: 1
                            },
                            videoId: videoId,
                            events: {
                                onStateChange: onPlayerStateChange,
                            },
                        });
                    } else {
                        console.error('Invalid embedUrl, unable to extract video ID');
                    }
                }
            };

            if (embedUrl) {
                if (!window.YT) {
                    const tag = document.createElement('script');
                    tag.src = 'https://www.youtube.com/iframe_api';
                    tag.async = true; // Async loading for better performance
                    const firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    window.onYouTubeIframeAPIReady = initializePlayer;
                } else {
                    initializePlayer();
                }
            }

            return () => {
                if (playerInstanceRef.current) {
                    playerInstanceRef.current.destroy();
                    playerInstanceRef.current = null;
                }
                clearInterval(timerIntervalRef.current);
            };
        } catch (e) {
            console.log(e);
        }
    }, [embedUrl, count, onPlayerStateChange, video_category]); // Added 'onPlayerStateChange' to the dependency array



    useEffect(() => {
        if (videoState === 'Playing') {
            timerIntervalRef.current = setInterval(() => {
                setRemainingTime((prevTime) => {
                    const newTime = prevTime - 1;
                    if (newTime <= 0) {
                        sendApiCall();
                        // setTimeout(() => {
                        //     sendApiCall();
                        // }, 1000); 
                        // API call when timer reaches zero
                        return timerDuration;
                    }

                    return newTime;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        };
    }, [videoState, timerDuration, remainingTime, sendApiCall]);

    const handleInputChange = useCallback(async () => {
        try {
            console.log(inputUrl)

            if (newVideoCategory === 1) {
                try {
                    const url = await convertToEmbedUrl(inputUrl);
                    if (url) {
                        const response = await fetch(`${host}/user/check/live/${videoIdRef.current}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': `Bearer ${sessionStorage.getItem('PIP-user')}`
                            },
                        });
                        const data = await response.json();
                        console.log('API Response:', data);

                        if (data.status === 'live') {
                            if (video_category === 0) {
                                setTimerDuration(3600);
                                setRemainingTime(3600);
                                setVideo_category(1);
                            }
                        } else {
                            setTimerDuration(120);
                            setRemainingTime(120);
                            setVideo_category(0);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }

            }
            else if (newVideoCategory === 0) {
                if (video_category === 1) {
                    setTimerDuration(120);
                    setRemainingTime(120);
                    setVideo_category(0);
                }
            }
            setEmbedUrl(convertToEmbedUrl(inputUrl));

            clearInterval(timerIntervalRef.current);

        } catch (e) {
            console.log(e);
        }
    }, [inputUrl, newVideoCategory, video_category, convertToEmbedUrl, host])

    const getVideos = useCallback(async () => {
        try {
            const response = await fetch(`${host}/user/home/videos`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${sessionStorage.getItem('PIP-user')}`
                },

            })
            console.log(response);
            const json = await response.json();
            console.log(json)
            if (response.ok) {
                setVideos(json)
            }
            else {
                setAlertMessage(json.message)
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 5000);
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [host])

    useEffect(() => {
        getVideos()
    }, [getVideos])


    useEffect(() => {
        handleInputChange()
    }, [inputUrl, newVideoCategory, handleInputChange])


    if (sessionStorage.getItem('PIP-user')) {
        return (
            <div className='home-video-main'>
                {showAlert && <Alert message={alertMessage} color='red' />}
                <div className="videobow-container">
                    {videos.map((e, index) => {
                        return (
                            <Videobox alink={e.vid_link} key={index} title={e.vid_title} duration={e.vid_duration} earnAbleMoney={e.vid_earning} status={e.live} onClick={handleInputChange} setInputUrl={setInputUrl} setNewVideoCategory={setNewVideoCategory} />
                        )
                    })}
                </div>
                <main id='main' className='for-add'>

                    <div className="add2"></div>
                    <section className='container2'>
                        {/* <div className='link-input-div'>
                            <input
                                type='text'
                                name='link-input'
                                id='link-input'
                                placeholder='Enter YouTube link'
                                value={inputUrl}
                                onChange={onChange}
                            />
                            <button disabled={inputUrl !== '' ? false : true} onClick={handleInputChange}>Play</button>
                        </div> */}
                        {embedUrl && (
                            <>
                                <div ref={playerRef} id="player"></div>
                            </>
                        )}
                        <div className='timer'>
                            <p>Video State: {videoState}</p>
                            <p>Timer: <span>{formatTime(remainingTime)}</span></p>
                        </div>
                    </section>
                    <div className="add2"></div>
                </main>

            </div>
        );
    }
    return (
        <>
            <section id='intro'>
                {/* The video  */}
                <video src={video} autoPlay muted >
                </video>

                <div id='intro-left'>
                    <div className='buttons'>
                        <Link to='/signup' className='button get-started'>Get Started</Link>
                        <Link to='/aboutus' className='button more-about'>More About</Link>
                    </div>
                </div>
            </section>

            <main id='main'>
                <section id='why-us' className='wow fadeIn'>
                    <div className='container'>
                        <div>
                            <header className='section-header'>
                                <motion.h3
                                    initial={{ y: 300, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: [0.1, 0.2, 1] }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        times: [0, 0.9, 1],
                                        type: 'spring'
                                    }}

                                >Registrations are open from 1st September to 30th November</motion.h3>

                            </header>

                            <motion.div className=''
                                initial={{ y: 300, opacity: 0 }}
                                whileInView={{ y: 0, opacity: [0.1, 0.2, 1] }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    times: [0, 0.9, 1],
                                    type: 'spring'
                                }}
                            >
                                <motion.div className='card wow'
                                    initial={{ y: 300, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: [0.1, 0.2, 1] }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        times: [0, 0.9, 1],
                                        type: 'spring'
                                    }}
                                >
                                    {/* <i className='fa fa-television'></i> */}
                                    <div className='card-body'>
                                        <h5 className='card-title'>Packages and Pricing</h5>
                                        <div className='card-text'><p>
                                            <b>We offer the following packages:</b>
                                            <br />
                                            <strong>Package 1: Free Account</strong>
                                            <br />

                                            <b>Features:</b> Access to basic tools, limited usage.
                                            <br />

                                            <b>Cost:</b> Free of charge.
                                            <br />

                                            <b>Payout:</b> PKR 109,900, subject to terms outlined below.

                                            <br /><br />
                                            <strong>Package 2: Basic Registration</strong>
                                            <br />
                                            For Pakistan Registration: 99 PKR
                                            <br />
                                            For International Registration: 1 USD
                                            <br />
                                            <b>Features:</b> Additional tools, expanded access.
                                            <br />

                                            <b>Payout:</b> PKR 40,000, subject to terms outlined below.

                                            <br /><br />
                                            <strong>Package 3: Premium Registration</strong>
                                            <br />

                                            For Pakistan Registration: 199 PKR
                                            <br />
                                            For International Registration: 2 USD
                                            <br />
                                            <b>Features:</b> All features from Package 2 plus extra benefits, priority support.
                                            <br />

                                            <b>Payout:</b> PKR 20,000, subject to terms outlined below.
                                        </p></div>
                                    </div>
                                </motion.div>

                                <motion.div className='card wow bounceInUp'
                                    initial={{ y: 300, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: [0.1, 0.2, 1] }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        times: [0, 0.9, 1],
                                        type: 'spring'
                                    }}
                                >
                                    {/* <i className='fa fa-users'></i> */}
                                    <div className='card-body'>
                                        <h5 className='card-title'>Payment Terms</h5>
                                        <div className='card-text'>

                                            <p>Payments for Package 2 and Package 3 must be made in full at the time of registration.
                                                Accepted payment method is Bank Transfer.
                                                <br />
                                                <br />
                                                All payments are non-refundable, except as required by law.
                                            </p></div>
                                    </div>
                                </motion.div>

                                <motion.div className='card wow bounceInUp'
                                    initial={{ y: 300, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: [0.1, 0.2, 1] }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        times: [0, 0.9, 1],
                                        type: 'spring'
                                    }}
                                >
                                    {/* <i className='fa fa-usd'></i> */}
                                    <div className='card-body'>
                                        <h5 className='card-title'>Payout Conditions </h5>
                                        <div className='card-text'>

                                            <p>
                                                <b>Package 1:</b> Payouts of PKR 109,900 are available as per the terms outlined below.<br /><br />
                                                <b>Package 2:  </b>Payouts of PKR 40,000 are available as per the terms outlined below.<br /><br />
                                                <b>Package 3: </b> Payouts of PKR 20,000 are available as per the terms outlined below.<br /><br />
                                                <b>Update Requirement:</b><br />
                                                You must update your account to the latest package level with a minimum balance of PKR 50,000 before any payout can be processed.<br /><br />
                                                <b>Test Requirement:</b><br />
                                                Candidates for Package 1 and Package 2 are required to pass a test before any payout is processed.<br />
                                                Candidates for Package 3 are not required to take any test.

                                            </p></div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <section id='portfolio' className='clearfix'>
                <div className='container'>
                    <header className='section-header'>
                        <h3 className='section-title'>Are you ready to start earning from Passive Income Pro ?</h3>
                    </header>
                    <center>
                        <Link className='strat1' to='/signup'>Get Started</Link>
                    </center>
                </div>
            </section>
        </>
    );
};

export default Home;

