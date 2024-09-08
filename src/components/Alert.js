import React from 'react'

const Alert = ({message, color}) => {
  console.log("Alert rendered with message:", message, "and color:", color);
  return (
    <div id='alert'>
        <div className={`alert-div ${color}`}>
        <p className={`alert-message`} >{message}</p>
        </div>
    </div>
  )
}

export default Alert