import React from 'react'

export default function EnterPinScreen
() {
  return (
    <div>

        <h2>
        Please Enter your Payment PIN to Confirm Transaction
        </h2>
        <div className={style.formGroup}>
            <h1 className={style.formLabel}>Enter Pin</h1>
            <input
              type="text"
              id="pin"
              value={pin}
              onChange={handlePinChange}
              className={style.input}
              placeholder="Enter Pin"
            />
            {/* {pinErrorMessage && <p className={style.errorMessage}>{pinErrorMessage}</p>} */}
    
        </div>
        <div>
            
        </div>

        <div className={style.buttonGroup}>
            <button type="button" className={style.buttonSubmit} onClick={handleSubmit}>
              Send
            </button>
            <button type="button" className={style.buttonCancel} onClick={handleCancel}>
              Cancel
            </button>
        </div>
    </div>
  )
}
