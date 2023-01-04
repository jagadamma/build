import React, {useState, useEffect} from 'react'
import {IoMdNotificationsOutline} from "react-icons/io"
import {ImWarning} from "react-icons/im"

import { getNotification } from '../api/bid';
import moment from 'moment';

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('')
  useEffect(() => {
    loadNotifications()
  }, [loading])

  const loadNotifications = async () => {
    await getNotification()
    .then((response) => {
      setNotification(response.data.notification)
      console.log('Notificatios', response.data)
    }
    )
    .catch((error) => {
      console.log('loadNotifications error', error)
    }
    )
  }
  return (
    <div className="container-fluid pt-3" style={{height: "100vh"}}>
        <p className='h1 mb-4' style={{fontFamily: "'Poppins', sans-serif"}}><span className='border-primary' style={{borderWidth: "3px",  borderBottomStyle: "solid"}}>Notification</span> <IoMdNotificationsOutline className='shake'/></p>
        <div class="alert alert-warning text-center" role="alert">
  <h4 class="alert-heading h1 font-weight-bold mb-3"><ImWarning className='mr-3'/>Safety tips</h4>
  <p>Verify the seller before making any payment.</p>
  <p>Avoid making any advance payment, it may be a trap.</p>
  <hr />
  <p class="mb-0">Any Fraud/Scam, Bidonbuy will not responsible.</p>
</div>
    {notification && notification.reverse().map((n, i) => (
        <div className='rounded p-2 pb-3 pl-4 bg-secondary mb-5' style={{borderLeft: "6px solid #0355d0"}}>
           <p className='h3'>Congratulations! Your bid has been accepted by Seller. </p> 
           <p>{n.productName}</p>
           {/* <p>Verify the seller before making any payment.</p>
           <p>Avoid making any advance payment, it may be a trap.</p>
           <p>Any Fraud/Scam, Bidonbuy will not responsible.</p> */}
           <button className="btn btn-primary btn-lg mr-5" value={n.sellerId}>Start Video Call with Seller</button>
           <button className='btn btn-primary btn-lg' value={n.sellerId}>Continue Chat with Seller</button>
           <p className='float-right mr-3'>{moment(n.createdAt).fromNow()}</p>
        </div>
    ))}
    </div>
  )
}

export default Notification