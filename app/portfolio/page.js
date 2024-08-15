import DesktopProject from '@/components/DesktopProject'
import React from 'react'

const projects = [
    {
        id: 1,
        name: 'Gifts By Breed',
    },
    {
        id: 2,
        name: 'LFC Clone Website'
    }
]

const page = () => {
    return (
        <div className='mt-24'>
            <ul>
                {projects.map(project => (
                    <DesktopProject key={project.id} />
                ))}
            </ul>
        </div>
    )
}

export default page