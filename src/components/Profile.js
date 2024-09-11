import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import FormInput from './FormInput'
import { useLocation } from 'react-router-dom';
import Alert from './Alert'

const Profile = () => {
  const navigate = useNavigate()

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Wrong Credentials')
  const [color, setColor] = useState('blue')
  const location = useLocation()
  useEffect(() => {
    if (!sessionStorage.getItem('PIP-user')) {
      navigate('/login')
    }
  }, [location, navigate])

  const name = sessionStorage.getItem('firstname') + " " + sessionStorage.getItem('lastname')

  const email = sessionStorage.getItem('email')
  const balance = sessionStorage.getItem('balance')
  //const host = process.env.REACT_APP_HOST;
  const host = 'https://api.passiveincomepro.pro'
  const [formState, setFormState] = useState('hide')

  // email, firstName, lastName, bankName, IbanNumber, amount
  const [withrawInfo, setWithrawInfo] = useState({ firstName: "", lastName: "", bankName: "", IbanNumber: "", amount: 0 })

  const { firstName, lastName, bankName, IbanNumber, amount } = withrawInfo;

  const onChange = (e) => {
    setWithrawInfo({ ...withrawInfo, [e.target.name]: e.target.value })
  }

  const handleShowWithdraw = (e) => {
    e.preventDefault();
    setFormState('show')
  }
  const handleWithrawBalance = async (e) => {
    e.preventDefault();
    console.log(withrawInfo)
    try {
      const response = await fetch(`${host}/user/request/payout`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${sessionStorage.getItem('PIP-user')}`
        },
        body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, bankName: bankName, IbanNumber: IbanNumber, amount: amount})
      })

      console.log(response);
      const json = await response.json();
      console.log(json)
      if (response.ok){
        setAlertMessage('Request Sent Successfuly')
        setColor('green')
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 6000);
      }
      else if (response.status === 400) {
        setAlertMessage(json.message)
        setColor('red')
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 6000);
      }
      else if (response.status === 401) {
        setAlertMessage(json.message)
        setColor('red')
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 6000);
      }
      else {
        setAlertMessage('Error! Try again later')
        setColor('red')
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
    setWithrawInfo((prevState) => ({
      ...prevState,
      firstName: '',
      lastName: '',
      bankName: "",
      IbanNumber: "",
      amount: 0
    }));
  }

  const handleCancle = (e) => {
    e.preventDefault();
    setFormState('hide')
    setWithrawInfo({ firstName: "", lastName: "", bankName: "", IbanNumber: "", amount: 0 })
  }

  return (
    <main className='profile'>
      {showAlert && <Alert message={alertMessage} color={color}/>}
      <section className='container row'>
        <div className='info-div'>
          <h6>Name: </h6><span className='name'>{name}</span>
          <h6 className='mt-10'>Email: </h6><span className='email'>{email}</span>
        </div>
        <div className='info-div'>
          <h6>Balance: </h6><span className='balance'>{balance}</span>
        </div>

      </section>
      <div className='container withraw-button-div'>
        <button className='primary-button mr-10' onClick={handleShowWithdraw}>Withraw Balance</button>
      </div>
      <section className={`container ${formState} `}>
        <form className='withraw-container' onSubmit={handleWithrawBalance}>

          <div className='withrawform'>

            <FormInput label='First Name' name='firstName' value={firstName} type='text' onChange={onChange} />
            <FormInput label='Last Name' name='lastName' value={lastName} type='text' onChange={onChange} />
            <FormInput label='Bank Name' name='bankName' value={bankName} type='text' onChange={onChange} />
            <FormInput label='IBAN Number' name='IbanNumber' value={IbanNumber} type='text' onChange={onChange} />
            <FormInput label='Request Amount' name='amount' value={amount} type='number' onChange={onChange} />

          </div>
          <div className="withraw-button-div">
            <button className='secondary-button mr-10' onClick={handleCancle}>Cancel</button>
            <button className='primary-button mr-10' type='submit' >Send Withraw Request</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Profile