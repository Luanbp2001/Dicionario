import React from 'react'
import './Modal.css'
export default function Modal({isOpen}) {

    if(isOpen){
        return (
            <div className='modal'>
                <p className='modal-paragraph'>"Enter the word you want to search for."</p>
            </div>
          )
    }else{
        return null
    }
  
}
