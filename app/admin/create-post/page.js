import CreatePostForm from '@/components/CreatePostForm'
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Container from '@/components/Container'

const page = async () => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return redirect('/')
    }

    return (
        <div className='mb-36 lg:mt-36'>
            <Container>
                <CreatePostForm />
            </Container>
        </div>
    )
}

export default page