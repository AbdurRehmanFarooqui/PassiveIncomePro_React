import React, { useEffect, useState } from 'react'
import FormInput from './FormInput'
import Alert from './Alert'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const SignUp = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const host = process.env.REACT_APP_HOST;
    const [path, setPath] = useState('')

    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('Wrong Credentials')

    const [credentials, setCredentials] = useState({ firstname: "", lastname: "", dob: "", gender: "MALE", email: "", password: "" })

    const { firstname, lastname, dob, gender, email, password } = credentials;

    useEffect(() => {
        if (sessionStorage.getItem('PIP-user')) {
            navigate('/')
        }
        if (location.pathname === '/login') {
            setPath(`${host}/auth/login`)
        } else {
            setPath(`${host}/auth/signup`)
        }
        setCredentials({ firstname: "", lastname: "", dob: "", gender: "MALE", email: "", password: "" })
    }, [location, host, navigate])

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(`firstName: ${firstname} \nlastName: ${lastname} \ndob: ${dob} \ngender: ${gender} \nemail: ${email}, \nPassword: ${password}`)
        try {
            const response = await fetch(`${path}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: location.pathname === '/login' ? JSON.stringify({ email, password }) : JSON.stringify({ firstName: firstname, lastName: lastname, dob: dob, gender: gender, email: email, password: password })
            })

            console.log(response);
            const json = await response.json();
            console.log(json)

            if (location.pathname === '/signup' && json.jwt) {
                sessionStorage.setItem('new-account', true)
            }
            if (json.jwt) {
                // Save auth-token & Redirect
                sessionStorage.setItem("PIP-user", json.jwt);
                if (json.firstName) {
                    var fname = json.firstName
                }
                else {
                    fname = json.firstname
                }
                sessionStorage.setItem("firstname", fname);
                if (json.lastName) {
                    var lname = json.lastName
                }
                else {
                    lname = json.lastname
                }
                sessionStorage.setItem("lastname", lname);
                sessionStorage.setItem("email", json.email);
                sessionStorage.setItem("balance", json.balance);
                setCredentials({ firstname: "", lastname: "", dob: "", gender: "MALE", email: "", password: "" })
                navigate('/')

            }
            else if (!response.ok) {
                // alert('No user with this email exists')
                setAlertMessage(json.message)
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 3000);
            }
            else {
                console.log("error")
            }
        } catch (error) {
            console.log(error);
            setAlertMessage('OOPs Some Error Occured')
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        }

    }

    if (location.pathname === '/login') {
        return (
            <main className='sign-up-main'>
                {showAlert && <Alert message={alertMessage} color='red' />}
                <section id='sign-up'>
                    <h2>Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <div>

                            <div>
                                <div className='left'>
                                    <FormInput label='Email' value={email} name='email' type='email' onChange={onChange} />
                                </div>



                                <div>
                                    <FormInput label='Password' value={password} name='password' type='password' onChange={onChange} />
                                </div>
                            </div>

                        </div>

                        <button>Log in to my account</button>
                    </form>
                    <div className="link-div">
                        <Link className='link' to='/forgotpassword'>Forgot Password?</Link>
                        <Link className='link' to='/signup'>Sign up</Link>
                    </div>
                </section>

            </main>
        )
    }
    return (
        <main className='sign-up-main'>
            {showAlert && <Alert message={alertMessage} color='red' />}
            <section id='sign-up'>
                <h2>Join Now</h2>
                <form onSubmit={handleSubmit}/*action="submit"*/>
                    <div>
                        <div>
                            <div className='left'>
                                <FormInput label='First Name' name='firstname' value={firstname} type='text' onChange={onChange} classInput='capitalize' />

                            </div>

                            <div>
                                <FormInput label='Last Name' name='lastname' value={lastname} type='text' onChange={onChange} classInput='capitalize' />

                            </div>
                        </div>
                        <div>
                            <div className='left'>

                                <FormInput label='Birthday' name='dob' value={dob} type='date' placeholder="YYYY-MM-DD" onChange={onChange} />

                            </div>

                            <div>

                                <div className='gender-input'>
                                    <p className='label'>Gender</p>
                                    <div>
                                        <input type="radio" id="male" className='gender-radio' name="gender" value="MALE" onChange={onChange} checked />
                                        <label htmlFor="male">Male</label>
                                        <input type="radio" id="female" className='gender-radio' name="gender" value="FEMALE" onChange={onChange} />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className='left'>
                                <FormInput label='Email' name='email' value={email} type='email' onChange={onChange} />
                            </div>

                            <div>
                                <FormInput label='Password' value={password} name='password' type='password' onChange={onChange} />
                            </div>
                        </div>
                    </div>
                    <button type='submit'>Create Account</button>
                </form>
            </section>

        </main>
    )
}

export default SignUp