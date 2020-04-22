import React, { useState, useEffect } from 'react'

export default function Blink({ speed, children }) {

    const [blink, setBlink] = useState(false);
    let timerID = undefined

    useEffect(() => {
        timerID = setInterval(()=> setBlink(!blink), speed || 300)

        return () => clearInterval(timerID)
    }, [])

    

    return (
        <div>
            {children}
        </div>
    )
}
