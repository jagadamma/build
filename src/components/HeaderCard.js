import React from 'react'

const headerCard = (props) => {
  return (
    <div className='headerCard col-sm-3 col-12'>
      <div class="headerCardhead">
        <p className='Ellipse'>{props.serial}</p>
        <p className="headerCardHead">{props.heading}</p>
      </div>
        <div  className='headerCardDes' >
        <p>{props.info}</p>
        </div>
    </div>
  )
}

export default headerCard