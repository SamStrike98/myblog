'use client'

import Link from 'next/link'
import PostCard from './PostCard'
import Container from './Container'
import { useState } from 'react'

const PostsList = ({ data }) => {
    const [search, setSearch] = useState('');

    const [webDevelopment, setWebDevelopment] = useState(false);
    const [maths, setMaths] = useState(false);
    const [physics, setPhysics] = useState(false);
    const [other, setOther] = useState(false);

    return (
        <div className='my-24'>
            <Container>
                <input
                    type="text"
                    placeholder="Search Posts or Categories"
                    className="input input-bordered input-primary w-full max-w-xs"
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* <div className='flex flex-row'>
                    <button onClick={() => setWebDevelopment(!webDevelopment)} className={`btn ${webDevelopment ? 'btn-active' : 'btn-outline'} btn-success`}>Web Development</button>
                    <button onClick={() => setMaths(!maths)} className={`btn ${maths ? 'btn-active' : 'btn-outline'} btn-primary`}>Maths</button>
                    <button onClick={() => setPhysics(!physics)} className={`btn ${physics ? 'btn-active' : 'btn-outline'} btn-secondary`}>Physics</button>
                    <button onClick={() => setOther(!other)} className={`btn ${other ? 'btn-active' : 'btn-outline'} btn-accent`}>Other</button>
                </div> */}

                <ul className='flex flex-row flex-wrap gap-8 my-6 px-4'>
                    {data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())).map(post => (
                        <PostCard key={post._id} id={post._id} title={post.title} category={post.category} createdAt={post.createdAt} draft={post.draft} />
                    ))}
                </ul>
            </Container>
        </div>
    )
}

export default PostsList