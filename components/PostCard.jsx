import Link from 'next/link'
import React from 'react'

const PostCard = ({ id, title, createdAt }) => {
    const newDate = new Date(createdAt)
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <Link href={`${process.env.URL}/posts/${id}`}>
                <div className="card-body">
                    <h2 className="card-title font-bold text-2xl">{title}</h2>
                    <p>{newDate.toLocaleDateString("en-GB")}</p>
                </div>
            </Link>

        </div>
    )
}

export default PostCard