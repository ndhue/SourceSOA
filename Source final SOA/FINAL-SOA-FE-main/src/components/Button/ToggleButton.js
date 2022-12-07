import React from 'react';
import './style.css';

export default function ToggleButton(props) {
  const statusType = props.type;
  const returnData = props.recieveData;

  const handleOnClick = () => {
    if (document.querySelector(`#${statusType}`).checked) {
      returnData(statusType, true);
    } else {
      returnData(statusType, false);
    }
  }
  return (
    <span className="toggle-button mx-1">
      <input className="toggle toggle-ios" id={statusType} type="checkbox" onClick={() => { handleOnClick() }} />
      <label className="toggle-btn" htmlFor={statusType}></label>
    </span>
  )
}
