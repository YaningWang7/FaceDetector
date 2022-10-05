import React from 'react';

const Rank = ({currentUser}) => {
    return(
        <div>
            <div className='white f2'>
                {currentUser.name +', your current rank is...'}
            </div>
            <div className='white f1'>
                {currentUser.entries}
            </div>    
        </div>
    )
}

export default Rank;