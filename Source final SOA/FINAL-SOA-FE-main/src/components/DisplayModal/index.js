import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './style.css';
const msg = `Item ${item.style} (barcode ${item.barcode}) is not 
  currently in this display. Do you want to add it?`

const addDialog = ({ onClose }) => {
  const handleClickedNo = () => {
    alert('clicked no')
    onClose()
  }
  const handleClickedYes = () => {
    alert('clicked yes')
    onClose()
  }
  return (
    <div className='add-dialog'>
      <h3>Add item to display</h3>
      <p>{msg}</p>
      <div className="add-dialog-buttons">
        <button onClick={handleClickedNo}>No</button>
        <button onClick={handleClickedYes}>Yes, add item</button>
      </div>
    </div>
  )
}      

confirmAlert({ customUI: addDialog })