import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router'
import FormInput from './FormInput'
import Spinner from './Spinner';
import Alert from './Alert'

const ForgotPassword = () => {

    let { secret } = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [secret1, setSecret] = useState('')
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('Wrong Credentials')
    const [color, setColor] = useState('blue')

    useEffect(() => {
        // Set secret when it changes
        if (secret) {
            setSecret(secret);
        }
    }, [secret]);

    useEffect(() => {
        setShowAlert(false)
    }, [location]);

    const host = process.env.REACT_APP_HOST;

    const onChange = (e) => {
        setEmail(e.target.value)
    }
    const passOnChange = (e) => {
        setPassword(e.target.value)
    }
    const repassOnChange = (e) => {
        setRePassword(e.target.value)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        const response = await fetch(`${host}/auth/password/reset/${email}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        try {
            const json = await response.json()
            if (response.ok) {
                setAlertMessage('Check Email!')
                setShowAlert(true)
                setColor('blue')
                setTimeout(() => {
                    setShowAlert(false)
                }, 3000);
            }
            else {
                setAlertMessage(json.message)
                setShowAlert(true)
                setColor('red')
                setTimeout(() => {
                    setShowAlert(false)
                }, 3000);
            }
        } catch (error) {
            
        }

    }
    const handleSubmitPass = async (e) => {

        e.preventDefault()
        if (repassword === password) {
            const response = await fetch(`${host}/auth/password/reset/link/${secret1}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: password })
            })
            try {
                if (response.ok) {
                    setAlertMessage('Password Changed Successfuly!')
                    setShowAlert(true)
                    setColor('green')
                    setLoading(true)
                    setTimeout(() => {
                        setShowAlert(false)
                        navigate('/login')
                    }, 5000);
                }
            } catch (error) {
                
            }
        }
        else {
            setAlertMessage('Passwords did not match')
            setShowAlert(true)
            setColor('red')
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        }
    }

    // Memoize verifylink using useCallback
    const verifylink = useCallback(async () => {
        const response = await fetch(`${host}/auth/password/reset/verify/${secret}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        try {
            if (!response.ok) {
                navigate('/login');
            } else {
                setLoading(false)
            }
        } catch (error) {
            
        }
    }, [secret, host, navigate]); // Include dependencies

    useEffect(() => {
        if (location.pathname === `/auth/password/reset/verify/${secret}`) {
            verifylink()
        }
    }, [location, secret, verifylink])


    if (location.pathname === `/auth/password/reset/verify/${secret}`) {
        return (
            <>
                {showAlert && <Alert message={alertMessage} color={color} />}
                {loading && <Spinner />}
                {!loading &&
                    <div>
                        <main className='sign-up-main'>
                            <section id='sign-up'>
                                <h2>Set New Password</h2>
                                <form onSubmit={handleSubmitPass}>
                                    <div>

                                        <div>
                                            <div className='left'>
                                                <FormInput label='Enter New Password' name='password' type='password' onChange={passOnChange} />
                                                <FormInput label='Re Enter Password' name='re-password' type='password' onChange={repassOnChange} />
                                            </div>
                                        </div>

                                    </div>

                                    <button>Proceed</button>
                                </form>
                            </section>

                        </main>
                    </div>
                }

            </>
        )
    }

    return (
        <>
            {showAlert && <Alert message={alertMessage} color={color} />}
            <div>
                <main className='sign-up-main'>
                    <section id='sign-up'>
                        <h2>Forgot Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div>

                                <div>
                                    <div className='left'>
                                        <FormInput label='Enter Your Email' name='email' type='email' onChange={onChange} />
                                    </div>
                                </div>

                            </div>

                            <button>Proceed</button>
                        </form>
                    </section>

                </main>
            </div>
        </>
    )
}

export default ForgotPassword