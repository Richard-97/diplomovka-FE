import React from 'react'

export default function Input({ type, placeholder, text, onChange }) {
  return (
    <div>
        <p className = 'input-text'>{text}</p>
        <input type = {type} placeholder = {placeholder} className = 'input' onChange = {(event) => onChange(event)} />
    </div>
  )
}
