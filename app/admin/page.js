import React from 'react'
import PostsList from '@/components/PostsList';
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Container from '@/components/Container';


export const dynamic = 'force-dynamic';
const page = async () => {
    const session = await auth();
    console.log(session)
    if (session?.user.role !== 'admin') {
        return redirect('/')
    }


    const res = await fetch(`${process.env.URL}/api/admin/posts`, {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });
    const data = await res.json();

    return (
        <div className='mb-36 lg:mt-36'>
            <Container>
                <h1>Admin Section</h1>

                {data &&
                    <PostsList data={data} />
                }
            </Container>
        </div>
    )
}

export default page








