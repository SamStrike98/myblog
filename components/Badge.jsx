import React from 'react'

const colours = {
    'Web Development': 'bg-blue-800',
    'Physics': 'bg-purple-800',
    'Maths': 'bg-red-800',
    'Other': 'bg-orange-800'
}

const Badge = ({ text }) => {
    console.log(text)
    return (
        <div className={`badge ${colours[text]}`}>{text}</div>
    )
}

export default Badge