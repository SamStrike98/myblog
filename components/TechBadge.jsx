import React from 'react'

const TechBadge = ({ icon, name }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip={name}>
            <span className='text-base-100'>{icon}</span>
        </div>
    )
}

export default TechBadge