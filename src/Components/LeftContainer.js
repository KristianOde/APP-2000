import React from 'react'

function LeftContainer() {
    let className = 'leftContainer box';
    let goldamount = Math.floor(Math.random() * 9999);
    return (
      <div className={className}>
        <div className='partyBox'>
          Gold: {goldamount}
        </div>
      </div>
    )
}

export default LeftContainer