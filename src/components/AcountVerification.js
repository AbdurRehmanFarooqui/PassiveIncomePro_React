import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router'

const AcountVerification = () => {
    let { secret } = useParams()
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('Loading...')
    const [color, setColor] = useState('blue')

    const host = process.env.REACT_APP_HOST;


    // Memoize verifylink using useCallback
    const verifylink = useCallback(async () => {

        try {
            const response = await fetch(`${host}/auth/account/verify/${secret}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json()
            console.log(response);
            console.log(json);
            if (response.ok) {
                setAlertMessage(json.message)
                setColor("cgreen")

                setTimeout(() => {
                    navigate('/login');
                }, 4000);

            } else {

                setAlertMessage(json.message)
                setColor("cred")

            }
        } catch (error) {
            console.log(error);
        }
    }, [secret, host, navigate]); // Include dependencies

    useEffect(() => {

        verifylink()

    }, [secret, verifylink])

    return (
        <div className='account-verification'>
            <h1>Account Verification Status: <span className={`${color}`}>{alertMessage}</span></h1>
        </div>
    )
}

export default AcountVerification