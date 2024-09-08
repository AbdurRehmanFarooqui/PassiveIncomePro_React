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

    useEffect(() => {
        console.log(showAlert)
    }, [showAlert]);

    const host = process.env.REACT_APP_HOST;

    const onChange = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }
    const passOnChange = (e) => {
        setPassword(e.target.value)

        console.log(showAlert)
        console.log(password)
    }
    const repassOnChange = (e) => {
        setRePassword(e.target.value)
        console.log(password)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(`email: ${email}`)

        const response = await fetch(`${host}/auth/password/reset/${email}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        try {
            console.log(response);
            const json = await response.json()
            console.log(json);
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
                console.log('asd');
                setColor('red')
                setTimeout(() => {
                    setShowAlert(false)
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleSubmitPass = async (e) => {

        e.preventDefault()
        console.log(`password: ${password}`)
        if (repassword === password) {
            const response = await fetch(`${host}/auth/password/reset/link/${secret1}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: password })
            })
            try {
                console.log(response);
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
                console.log(error);
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
            console.log(response);
            if (!response.ok) {
                navigate('/login');
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }, [secret, host, navigate]); // Include dependencies

    useEffect(() => {
        if (location.pathname === `/auth/password/reset/verify/${secret}`) {
            console.log('verify')
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