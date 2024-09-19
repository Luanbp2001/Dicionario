import React from 'react'
import './Modal.css'
export default function Modal({isOpen}) {

    if(isOpen){
        return (
                <p className='modal-paragraph'>"Enter the word you want to search for. The dictionary project aims to create a dynamic and interactive platform for consulting word definitions and meanings. The goal is to offer a practical and easy-to-use tool that allows users to quickly search for verbs, nouns, synonyms, adjectives, etc."</p>
          )
    }else{
        return null
    }
  
}
