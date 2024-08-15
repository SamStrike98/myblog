import React from 'react'
import PostsList from '@/components/PostsList';
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth();
    console.log(session)
    if (session.user.role !== 'admin') {
        return redirect('/')
    }

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








