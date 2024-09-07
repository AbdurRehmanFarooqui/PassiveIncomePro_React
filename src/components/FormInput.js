 import React from 'react'
 
 const FormInput = ({name, label, type, onChange, classInput, classLabel, classFormInput, placeholder, value}) => {
   return (
     <div className={`form-input ${classFormInput}`} >
        <label className={`label ${classLabel}`} htmlFor={name}>{label}</label>
        <input className={`input ${classInput}`} type={type} name={name} onChange={onChange} value={value} placeholder={placeholder} required/>
     </div>
   )
 }
 
 export default FormInput