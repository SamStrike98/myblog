import SinglePost from '@/components/SinglePost';
import React from 'react'

const page = async ({ params }) => {
    const id = params.id;

    const res = await fetch(`${process.env.URL}/api/posts/${id}`);
    const data = await res.json();
    return (
        <div>
            <SinglePost title={data.title} content={data.content} createdAt={data.createdAt} />
        </div>
    )
}

export default page