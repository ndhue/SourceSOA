import React from 'react';

export default function PageNotFound(props) {
  return (
    <div className='m-auto text-center' style={{ maxWidth: 500 }}>
      <img src='https://static.xx.fbcdn.net/rsrc.php/yN/r/MnQWcWb6SrY.svg' width={100} height={100} />
      <p className='font-weight-bold'>This page isn't available</p>
      <span>The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</span>
      <a className="nav-link" onClick={() => { props.history.goBack() }}>Go back</a>
    </div>
  )
}