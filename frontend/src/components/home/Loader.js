import React from 'react';
import LoaderImg from './images/dualRingLoader.svg'
import "./Loader.css";

const Loader = () => {
    return (
        <div className='loader'>
            <img src = {LoaderImg} alt = "loader" />
        </div>
    )
}

export default Loader;