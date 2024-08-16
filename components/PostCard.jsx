'use client'

import Link from 'next/link'
import React from 'react'
import Badge from './Badge'
import { usePathname } from 'next/navigation'

const colours = {
    'Web Development': 'from-blue-800 to-blue-400',
    'Physics': 'from-purple-800 to-purple-400',
    'Maths': 'from-red-800 to-red-400',
    'Other': 'from-orange-800 to-orange-400'
}

const PostCard = ({ id, title, createdAt, category, draft }) => {
    const pathname = usePathname()
    console.log(pathname)
    const newDate = new Date(createdAt)
    return (
        <div className={`rounded-3xl p-[4px] bg-gradient-to-r hover:bg-gradient-to-b transition-all ${colours[category]} group`}>
            <div className=" bg-base-100 rounded-[calc(1.5rem-4px)] h-full">
                <Link href={pathname === '/admin' ? `/admin/posts/${id}` : `/posts/${id}`}>
                    <div className="card-body">
                        <h2 className="card-title font-bold text-4xl group-hover:text-primary transition-colors">{title}</h2>
                        <Badge text={category} />
                        <p>{newDate.toLocaleDateString("en-GB")}</p>
                        {draft === true && <div className="badge badge-warning gap-2">Draft</div>}
                    </div>
                </Link>

            </div>
        </div>

    )
}

export default PostCard