import React from 'react'

const Videobox = ({ title, duration, earnAbleMoney, alink, setInputUrl, status, setNewVideoCategory }) => {

    return (
        <div className='videobox' onClick={async () => {
            setNewVideoCategory(status)
            setInputUrl(alink);
        }}>
            <h3>{title}</h3>
            <div>
                {status===1 && <p>live</p>}
                {status===0 &&<p>{duration} min</p>}
                {status===0 &&<p>Est. Rs {earnAbleMoney} </p>}
            </div>
        </div>
    )
}

export default Videobox