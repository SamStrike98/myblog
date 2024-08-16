import React from 'react'

const TechBadge = ({ icon, name }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip={name}>
            <span className='text-primary'>{icon}</span>
        </div>
    )
}

export default TechBadge