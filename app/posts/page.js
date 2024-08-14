import React from 'react'
import PostsList from '@/components/PostsList';

const page = async () => {
    const res = await fetch(`${process.env.URL}/api/posts`, { cache: 'no-store' });
    const data = await res.json();

    return (
        <div>
            <h1>Admin Section</h1>

            {data &&
                <PostsList data={data} />
            }

        </div>
    )
}

export default page