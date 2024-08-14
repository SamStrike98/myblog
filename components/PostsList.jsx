'use client'

import Link from 'next/link'
import PostCard from './PostCard'
import Container from './Container'
import { useState } from 'react'

const PostsList = ({ data }) => {
    const [search, setSearch] = useState('');
    return (
        <div className='my-24'>
            <Container>
                <input
                    type="text"
                    placeholder="Search Posts or Categories"
                    className="input input-bordered input-primary w-full max-w-xs"
                    onChange={(e) => setSearch(e.target.value)}

                />

                <ul className='flex flex-row flex-wrap gap-8 my-6 px-4'>
                    {data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())).map(post => (
                        <PostCard key={post._id} id={post._id} title={post.title} category={post.category} createdAt={post.createdAt} />
                    ))}
                </ul>
            </Container>
        </div>
    )
}

export default PostsList