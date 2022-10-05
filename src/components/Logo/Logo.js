import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './logo-color.png';
import './Logo.css';

const Logo = () => {
    return(
        <div>
            <Tilt
                className="logo br2 shadow-2"
                perspective={500}
                glareEnable={true}
                glareMaxOpacity={0.45}
                scale={1.02}
            >
                <div className="inner-element">
                    <img className='logo-img' alt='logo'src={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;