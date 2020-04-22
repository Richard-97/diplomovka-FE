import React from 'react'
import { Link } from 'react-router-dom';

export default function SimpleButton({ text, link, onClick }) {
  return (
    <Link to = {link} className = 'link'>
        <div className = 'simpleButton' onClick = {onClick}>
            <p>{text}</p>
        </div>
    </Link>
  )
}
