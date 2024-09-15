import React from 'react'

const Videobox = ({ title, duration, earnAbleMoney, onClick, alink, setInputUrl, status, setNewVideoCategory }) => {
    // var alink = alink;
    return (
        <div className='videobox' onClick={async () => {
            setNewVideoCategory(status)
            setInputUrl(alink);
            // onClick();
        }}>
            <h3>{title}</h3>
            <div>
                <p>{duration} min</p>
                <p>Est. Rs {earnAbleMoney} </p>
            </div>
        </div>
    )
}

export default Videobox