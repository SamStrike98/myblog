'use client'

import DesktopProject from './DesktopProject'
import PortfolioSectionTitle from './PortfolioSectionTitle'
import Container from './Container'
import { useState } from 'react'

const PostsList = ({ data }) => {
    const [search, setSearch] = useState('');


    return (
        <div className='my-10'>
            <Container>
                <PortfolioSectionTitle text={'All Projects'} />
                <input
                    type="text"
                    placeholder="Search Projects or Tech"
                    className="input input-bordered input-primary w-full max-w-xs"
                    onChange={(e) => setSearch(e.target.value)}
                />


                <ul className='flex flex-row flex-wrap gap-8 my-6 px-4'>
                    {data?.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.tech.join(' ').toLowerCase().includes(search.toLowerCase())).map(project => (
                        <DesktopProject key={project._id} id={project._id} name={project.name} tech={project.tech} info={project.description} repoLink={project.githubLink} liveSiteLink={project.liveSiteLink} img={project.img} />
                    ))}
                </ul>
            </Container>
        </div>
    )
}

export default PostsList